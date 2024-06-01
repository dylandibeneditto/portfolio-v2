"use client";
import { useEffect, useState } from "react";
import "./Clock.css";
import GithubActivity from "./GithubActivity.tsx"

export default function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date();

      const currentTime = dateObject.toLocaleString("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "numeric",
      });

      setTime(currentTime);
    }, 15000);
  }, []);

  return (
    <div className="info-bar">
      <GithubActivity username="dylandibeneditto"></GithubActivity>
      <div></div>
      <div className="time">
        {time} <span className="timezone">EST</span>
      </div>
    </div>
  );
}
