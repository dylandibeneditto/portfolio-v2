"use client";
import { useState, useEffect, useRef } from "react";
import "./AwardScroll.css";

interface Award {
  company: string;
  title: string;
  awardDesc: string;
  year: string;
}

export default function AwardsScroll() {
  const awards = useRef<Award[]>([
    {
      company: "award company",
      title: "best developer ever",
      awardDesc: "this award goes to the best dev ever",
      year: "2024",
    },
    {
      company: "award company",
      title: "best web dev ever",
      awardDesc: "this award goes to the best web dev ever",
      year: "2024",
    },
  ]);
  const [position, setPosition] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(false);
  const [switched, setSwitched] = useState<boolean>(false);

  useEffect(() => {
    if (awards.current.length > 1) {
      const interval = setInterval(() => {
        if (!switched) {
          setFade(true);
          setTimeout(() => {
            setPosition(
              (prevPosition) => (prevPosition + 1) % awards.current.length
            );
            setFade(false);
          }, 500);
        } else {
          setSwitched(false);
        }
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [switched]);

  const handleDotClick = (index: number) => {
    setSwitched(true);
    setFade(true);
    setTimeout(() => {
      setPosition(index);
      setFade(false);
    }, 500);
  };

  return (
    <div className="award-content">
      <div className={`award ${fade ? "" : "active"}`}>
        <div className="award-title">{awards.current[position].title}</div>
        <div className="award-details">
          {awards.current[position].company +
            " - " +
            awards.current[position].year}
        </div>
        <div className="award-description">
          {awards.current[position].awardDesc}
        </div>
      </div>
      <div className="scroll-dots">
        {awards.current.map((item, index) => {
          return (
            <div
              key={index}
              className={"scroll-dot " + (position === index ? "active" : "")}
              onClick={() => handleDotClick(index)}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
