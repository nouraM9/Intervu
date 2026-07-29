import { useState } from "react";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

function InterviewSetup() {
  const [type, setType] = useState<string>("select type");
  const [difficulty, setDifficulty] = useState<string>("select difficulty");
  const [duration, setDuration] = useState<string>("select duration");

  const interviewTypes = [
    "front-end",
    "back-end",
    "behavioral",
    "system-design",
  ];
  const difficulties = ["Junior", "mid-level", "senior"];
  const durations = ["15", "20", "30"];

  return (
    <div className=" mx-auto max-w-7xl px-8 py-16 ">
      <div className="message">
        <h1 className="title">Set Up Your Mock Interview</h1>
      </div>
      <div className="flex justify-center items-center min-h-screen ">
        <div className="w-full max-w-xl rounded-xl  bg-white p-8 shadow-(--card-shadow) border border-(--border) p-16">
          <div className="flex justify-center flex-col">
            <Dropdown
              label="Interview Type"
              options={interviewTypes}
              value={type}
              onChange={setType}
            />
            <Dropdown
              label="Difficulty"
              options={difficulties}
              value={difficulty}
              onChange={setDifficulty}
            />
            <Dropdown
              label="Duration"
              options={durations}
              value={duration}
              onChange={setDuration}
            />
          </div>
          <Button to="/interview">Start Interview</Button>
        </div>
      </div>
    </div>
  );
}

export default InterviewSetup;
