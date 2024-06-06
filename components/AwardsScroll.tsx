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

  useEffect(() => {
    if (awards.current.length > 1) {
      setInterval(() => {
        console.log(position)
        setPosition(((position + 1) % awards.current.length));
      }, 2000);
    }
  }, [position, awards]);

  return <div>{awards.current[position].title}</div>;
}
