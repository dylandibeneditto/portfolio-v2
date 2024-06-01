// components/GitHubActivity.js
import { useState, useEffect } from "react";
import "./GithubActivity.css";

function formatTimeDifference(dateString: string): string {
    // Convert the provided date string to a Date object
    const providedDate: Date = new Date(dateString);

    // Calculate the time difference between the provided date and the current time
    const currentTime: Date = new Date();
    const timeDifference: number = Math.abs(currentTime.getTime() - providedDate.getTime());

    // Convert milliseconds to seconds, minutes, hours, and days
    const seconds: number = Math.floor(timeDifference / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);

    // Format the result based on the time difference
    if (days > 0) {
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else {
        return `Just now`;
    }
}

const GitHubActivity = ({ username }: { username: string }) => {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/events`
        );
        const data = await response.json();
        console.log(data);
        setActivity(data);
      } catch (error) {
        console.error("Error fetching GitHub activity:", error);
      }
    };

    fetchData();
  }, [username]);
  console.log(activity);
  return activity.length == 0 ? (
    <span className="secondary">loading...</span>
  ) : (
    <div className="last-push"><span className="secondary">Last seen</span> {formatTimeDifference(activity[0].created_at)}</div>
  );
};

export default GitHubActivity;
