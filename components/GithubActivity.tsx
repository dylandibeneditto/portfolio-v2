import { useState, useEffect } from "react";
import "./GithubActivity.css";

interface GitHubEvent {
  type: string;
  repo: {
    name: string;
  };
  created_at: string;
}

function formatTimeDifference(dateString: string): string {
  const providedDate = new Date(dateString);
  const currentTime = new Date();
  const timeDifference = Math.abs(currentTime.getTime() - providedDate.getTime());

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else {
    return `Just now`;
  }
}

const GitHubActivity = ({ username }: { username: string }) => {
  const [activity, setActivity] = useState<GitHubEvent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/events`
        );
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data: GitHubEvent[] = await response.json();
        setActivity(data);
      } catch (error) {
        console.error("Error fetching GitHub activity:", error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <>
      {activity.length === 0 ? (
        <span className="secondary">Loading...</span>
      ) : (
        <div className="last-push">
          <span className="secondary">Last Seen: </span>
          {activity[0] && formatTimeDifference(activity[0].created_at)}
          {activity[0] && (
            <div className="event-info">
              <span>{activity[0].type.replace('Event', '').toLowerCase()}: </span>
              <a
                href={`https://github.com/${activity[0].repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {activity[0].repo.name.split("/")[1]}
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GitHubActivity;
