"use client";
import { useState, useEffect, useRef, MouseEvent } from "react";
import Link from "next/link";

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
  yOffset: number;
  url: string;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const [hoverLink, setHoverLink] = useState<string>("");

  const initParticles = (canvasWidth: number, canvasHeight: number) => {
    const titles: string[] = [
      "JavaScript",
      "HTML",
      "CSS",
      "TypeScript",
      "C++",
      "Java",
      "Rust",
      "Swift",
      "Python",
      "Ruby",
      "Node.js",
      "React.js",
      "Next.js",
      "GraphQL",
    ];
    const particlesArray: Particle[] = [];
    for (let i = 0; i < titles.length; i++) {
      const size = 3 * window.devicePixelRatio;
      particlesArray.push({
        x: Math.random() * canvasWidth - 20 + 10,
        y: Math.random() * canvasHeight - 20 + 10,
        size,
        targetSize: size,
        label: titles[i],
        dx: (Math.random() - 0.5) * 0.002,
        dy: (Math.random() - 0.5) * 0.002,
        originalSize: size,
        hovered: false,
        opacity: 1,
        xOffset: 1,
        yOffset: 1,
        url: `/skills/${titles[i].toLowerCase()}`,
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
      let anyHovered = false;
      particlesRef.current.forEach((particle, index) => {
        if (particle.hovered) {
          anyHovered = true;
        }

        if (!particle.hovered) {
          const centerX = canvas!.width / 2;
          const centerY = canvas!.height / 2;

          // Attraction to the center
          const dxCenter = centerX - particle.x;
          const dyCenter = centerY - particle.y;
          const distanceToCenter = Math.hypot(dxCenter, dyCenter);
          const centerForce = distanceToCenter / 40000; // Attraction force to center
          const centerAngle = Math.atan2(dyCenter, dxCenter);

          particle.dx += Math.cos(centerAngle) * centerForce;
          particle.dy += Math.sin(centerAngle) * centerForce;

          particlesRef.current.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex) {
              const dx = otherParticle.x - particle.x;
              const dy = otherParticle.y - particle.y;
              const distance = Math.hypot(dx, dy);
              const repulsionForce = (1 / (distance / 0.5)) * 0.75; // Repulsion force
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
        context!.globalAlpha = 0.75; // Reset global alpha
        context!.beginPath();
        context!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context!.fillStyle = "white";
        context!.fill();
        context!.closePath();

        const hoverOpacity =
          particle.hovered || !anyHovered ? 1 : 0.2;
        const opacitySpeed = 0.1;
        particle.opacity = particle.opacity || 1;
        particle.opacity += (hoverOpacity - particle.opacity) * opacitySpeed;

        context!.globalAlpha = 1; // Reset global alpha
        context!.font = `${12 * window.devicePixelRatio}px Menlo, monospace`;
        context!.globalAlpha = particle.opacity;

        let targetX;
        const textWidth = context!.measureText(particle.label).width;
        
        if (particle.x > canvas!.width - textWidth - 5) {
          targetX = -textWidth - 10;
        } else {
          targetX = 10;
        }
        particle.xOffset += (targetX - particle.xOffset) * .1;
        

        let targetY;
        if (particle.y < (15 * window.devicePixelRatio) + 17) {
          targetY = 15 * window.devicePixelRatio;
        } else {
          targetY = -5 * window.devicePixelRatio;
        }
        particle.yOffset += (targetY - particle.yOffset) * .25;

        
        context!.fillStyle = "white";
        context!.fillText(
          particle.label,
          particle.x + particle.xOffset,
          particle.y + particle.yOffset
        );

        // Draw lines between close particles
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j];
          const distance = Math.hypot(
            particle.x - otherParticle.x,
            particle.y - otherParticle.y
          );
          if (distance < 1000) {
            context!.globalAlpha = 0.2; // Reset global alpha
            context!.beginPath();
            context!.moveTo(particle.x, particle.y);
            context!.lineTo(otherParticle.x, otherParticle.y);
            context!.lineWidth = window.devicePixelRatio;
            context!.strokeStyle = `rgba(255, 255, 255, ${
              1 - distance / 400
            })`;
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

    let particleHovered = false;
    let newHoverLink = "";

    particlesRef.current.forEach((particle, index) => {
      const distance = Math.hypot(particle.x - mouseX, particle.y - mouseY);
      if (distance < particle.size + 5 * window.devicePixelRatio) {
        particle.hovered = true;
        particlesRef.current.splice(index, 1);
        particlesRef.current.unshift(particle);
        particle.targetSize = particle.originalSize * 1.5;
        particleHovered = true;
        newHoverLink = particle.url;
      } else {
        particle.hovered = false;
        particle.targetSize = particle.originalSize;
      }
    });

    if (canvasRef.current) {
      canvasRef.current.style.cursor = particleHovered ? "pointer" : "default";
    }

    setHoverLink(newHoverLink);
  };

  const handleClick = (event: MouseEvent<HTMLCanvasElement>) => {
    if (hoverLink) {
      window.open(hoverLink, "_blank");
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    />
  );
}
