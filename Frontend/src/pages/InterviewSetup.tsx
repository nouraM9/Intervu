import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import toast from "react-hot-toast";
import axios from "axios";
import useLocalStorageState from "use-local-storage-state";

function InterviewSetup() {
  const navigate = useNavigate();
  const [type, setType] = useState<string>("select type");
  const [difficulty, setDifficulty] = useState<string>("select difficulty");
  const [duration, setDuration] = useState<string>("select duration");
  const [token] = useLocalStorageState("authToken", { defaultValue: "" });

  const interviewTypes = [
    "front-end",
    "back-end",
    "behavioral",
    "system-design",
  ];
  const difficulties = ["Junior", "mid-level", "senior"];
  const durations = ["15", "20", "30"];

  const handleSubmit = async () => {
    if (
      type === "select type" ||
      difficulty === "select difficulty" ||
      duration === "select duration"
    ) {
      toast.error("Please make a selection for all choices");
      return;
    }
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/interview-session",
        {
          interview_type: type,
          difficulty,
          duration,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Session created!");
      const sessionId = res.data.id;
      navigate(`/interview/${sessionId}`);
    } catch (error) {
      toast.error("Faild to start session. Please try again.");
    }
  };
  return (
    <div className=" mx-auto max-w-7xl px-8">
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-xl rounded-2xl  bg-white  shadow-(--card-shadow) border border-(--border) p-10">
          <div className="message">
            <h1 className="title text-center my-4">
              Set Up Your Mock Interview
            </h1>
          </div>
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
          <div className="flex justify-center mt-4">
            {/* <Button to="/interview">Start Interview</Button> */}
            <Button onClick={handleSubmit}>Start Interview</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewSetup;
