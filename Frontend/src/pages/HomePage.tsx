import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import axios from "axios";
import useLocalStorageState from "use-local-storage-state";
import { useNavigate } from "react-router-dom";
import { useResume } from "../components/TextExtract";

function HomePage() {
  const [name, setName] = useState<string>("");
  const [latestScore, setLatestScore] = useState<number>(0);
  const [totalInterviewsCount, setTotalInterviewCount] = useState<number>(0);
  const [token] = useLocalStorageState("authToken", { defaultValue: "" });
  const [id] = useLocalStorageState("id", { defaultValue: 0 });
  const navigate = useNavigate();

  const { resumeStatus, loading, uploadResume, updateResume } = useResume();
  const hasResume = resumeStatus.includes("✔️");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setName(response.data.user.firstName));
  }, [token, id]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (hasResume) {
      updateResume(file);
    } else {
      uploadResume(file);
    }

    // reset input so selecting the same file again still triggers onChange
    e.target.value = "";
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 relative">
      <div className="mb-10 flex justify-between">
        <div>
          <h1 className="title">Welcome, {name}</h1>
          <p className="body-text-1 mt-2">
            You have 3 interviews completed, keep going!
          </p>
        </div>

        <div>
          <Button onClick={handleButtonClick} disabled={loading}>
            {loading
              ? "Uploading..."
              : hasResume
                ? "Update Resume"
                : "Upload Resume"}
          </Button>
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card title={"Resume"} value={resumeStatus} />
        <Card title={"Score"} value={latestScore} />
        <Card title={"Count"} value={totalInterviewsCount} />
      </div>

      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex gap-2">
        <Button to="/interview-setup">Start New Interview</Button>
      </div>
    </div>
  );
}

export default HomePage;
