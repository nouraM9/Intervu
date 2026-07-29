import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

function HomePage() {
  const [name, setName] = useState<string>("Noura");
  const [resumeStatus, setResumeStatus] = useState<string>("Not Uploaded");
  const [latestScore, setLatestScore] = useState<number>(0);
  const [totalInterviewsCount, setTotalInterviewCount] = useState<number>(0);
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <h1 className=" title">Welcome , {name}</h1>
        <p className="body-text-1 mt-2">
          You have 3 interviews completed,Keep going!
        </p>
      </div>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 mb-[24px]">
        <Card title={"Resume"} value={resumeStatus} />
        <Card title={"Score"} value={latestScore} />
        <Card title={"Count"} value={totalInterviewsCount} />
      </div>
      <Button to="/interview-setup">Start New Interview</Button>
    </div>
  );
}

export default HomePage;
