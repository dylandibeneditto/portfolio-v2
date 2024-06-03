"use client";
import { useEffect, useRef, MouseEvent } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  targetSize: number;
  label: string;
  dx: number;
  dy: number;
  originalSize: number;
  hovered: boolean;
  opacity: number;
  xOffset: number;
  yOffset: number
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const anyHoveredRef = useRef<boolean>(false);

  const initParticles = (canvasWidth: number, canvasHeight: number) => {
    const particlesArray: Particle[] = [];
    for (let i = 0; i < 15; i++) {
      const size = 3 * window.devicePixelRatio;
      particlesArray.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        size,
        targetSize: size,
        label: `Node ${i}`,
        dx: (Math.random() - 0.5) * 0.02,
        dy: (Math.random() - 0.5) * 0.02,
        originalSize: size,
        hovered: false,
        opacity: 1,
        xOffset: 1,
        yOffset: 1,
      });
    }
    particlesRef.current = particlesArray;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");

    const setCanvasSize = () => {
      const width = document.querySelector(".grid-col-2>.tile")!.clientWidth;
      const height =
        document.querySelector(".grid-col-2>.tile")!.clientHeight - 28.5;
      canvas!.width = width * window.devicePixelRatio;
      canvas!.height = height * window.devicePixelRatio;
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      initParticles(canvas!.width - 2, canvas!.height - 2);
    };

    setCanvasSize();

    const animate = () => {
      context!.clearRect(0, 0, canvas!.width, canvas!.height);
      anyHoveredRef.current = false;
      particlesRef.current.forEach((particle, index) => {
        if (particle.hovered) {
          anyHoveredRef.current = true;
        }

        if (!particle.hovered) {
          const centerX = canvas!.width / 2;
          const centerY = canvas!.height / 2;

          // Attraction to the center
          const dxCenter = centerX - particle.x;
          const dyCenter = centerY - particle.y;
          const distanceToCenter = Math.hypot(dxCenter, dyCenter);
          const centerForce = distanceToCenter / 30000; // Attraction force to center
          const centerAngle = Math.atan2(dyCenter, dxCenter);

          particle.dx += Math.cos(centerAngle) * centerForce;
          particle.dy += Math.sin(centerAngle) * centerForce;

          particlesRef.current.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex) {
              const dx = otherParticle.x - particle.x;
              const dy = otherParticle.y - particle.y;
              const distance = Math.hypot(dx, dy);
              const repulsionForce = 1 / distance; // Repulsion force
              const angle = Math.atan2(dy, dx);

              particle.dx += Math.cos(angle) * (0 - repulsionForce);
              particle.dy += Math.sin(angle) * (0 - repulsionForce);
            }
          });

          particle.x += (particle.dx / 2) * window.devicePixelRatio;
          particle.y += (particle.dy / 2) * window.devicePixelRatio;
        }

        // Check collision with walls
        if (
          particle.x + particle.size > canvas!.width ||
          particle.x - particle.size < 0
        ) {
          particle.dx *= -1;
        }
        if (
          particle.y + particle.size > canvas!.height ||
          particle.y - particle.size < 0
        ) {
          particle.dy *= -1;
        }

        // Handle hover animation
        if (particle.hovered) {
          const growSpeed = 0.2 * window.devicePixelRatio;
          if (particle.size < particle.targetSize) {
            particle.size += growSpeed;
          }
        } else {
          const shrinkSpeed = 0.1 * window.devicePixelRatio;
          if (particle.size > particle.originalSize) {
            particle.size -= shrinkSpeed;
          }
        }

        // Draw particle
        context!.beginPath();
        context!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context!.fillStyle = "white";
        context!.fill();
        context!.closePath();

        const hoverOpacity = particle.hovered || !anyHoveredRef.current ? 1 : 0.2;
        const opacitySpeed = 0.1;
        particle.opacity = particle.opacity || 1;
        particle.opacity += (hoverOpacity - particle.opacity) * opacitySpeed;

        // Draw label with adjusted opacity
        let targetX = particle.x;
        if (particle.x > canvas!.width - (25 * window.devicePixelRatio)) {
          targetX = canvas!.width - particle.size;
        } else if (particle.x < (25 * window.devicePixelRatio)) {
          targetX = particle.size;
        }
    
        // Calculate target y position
        let targetY = particle.y;
        const yOffset = particle.y > canvas!.height - (25 * window.devicePixelRatio) ? -1 : 1;
        const yLabelOffset = (particle.size + (10 * window.devicePixelRatio)) * yOffset;
        targetY += yLabelOffset;
    
        const xOffsetSpeed = 0.05; // Adjust as needed
        particle.xOffset = particle.xOffset || particle.x;
        particle.xOffset += (targetX - particle.xOffset) * xOffsetSpeed;
    
        const yOffsetSpeed = 0.05; // Adjust as needed
        particle.yOffset = particle.yOffset || particle.y + yLabelOffset;
        particle.yOffset += (targetY - particle.yOffset) * yOffsetSpeed;
    
        //
        // TODO: refactor so animation is applied to the relative offset of the particle x, not the absolute position of the label
        //
        context!.font = `${12 * window.devicePixelRatio}px '__Inter_aaf875'`;
        context!.textAlign = "center";
        context!.globalAlpha = particle.opacity;
        context!.fillStyle = "white";
        context!.fillText(
          particle.label,
          particle.xOffset,
          particle.yOffset
        );
        context!.globalAlpha = 1; // Reset global alpha

        // Draw lines between close particles
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j];
          const distance = Math.hypot(
            particle.x - otherParticle.x,
            particle.y - otherParticle.y
          );
          if (distance < 1000) {
            context!.beginPath();
            context!.moveTo(particle.x, particle.y);
            context!.lineTo(otherParticle.x, otherParticle.y);
            context!.lineWidth = window.devicePixelRatio;
            context!.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 400})`;
            context!.stroke();
            context!.closePath();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) * window.devicePixelRatio;
    const mouseY = (event.clientY - rect.top) * window.devicePixelRatio;

    particlesRef.current.forEach((particle, index) => {
      const distance = Math.hypot(particle.x - mouseX, particle.y - mouseY);
      if (distance < particle.size + 5 * window.devicePixelRatio) {
        particle.hovered = true;
        particlesRef.current.splice(index, 1);
        particlesRef.current.unshift(particle);
        particle.targetSize = particle.originalSize * 1.5;
      } else {
        particle.hovered = false;
        particle.targetSize = particle.originalSize;
      }
    });
  };

  return <canvas ref={canvasRef} onMouseMove={handleMouseMove} />;
}
