import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import axios from "axios";
import useLocalStorageState from "use-local-storage-state";
import { useNavigate } from "react-router-dom";
const fileUploadClass = `rounded-xl
            bg-(--btn)
            py-4 
            px-20
            text-(--bg)
            transition-colors
            hover:bg-(--btn-gradiant)
            absolute
            left-
            w-20
       
            `;
function HomePage() {
  const [name, setName] = useState<string>("");
  const [resumeStatus, setResumeStatus] = useState<string>("Not Uploaded");
  const [latestScore, setLatestScore] = useState<number>(0);
  const [totalInterviewsCount, setTotalInterviewCount] = useState<number>(0);
  const [token] = useLocalStorageState("authToken", { defaultValue: "" });
  const [id] = useLocalStorageState("id", { defaultValue: 0 });
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(e.target.files);
    setFileName(file ? file.name : null);
  };
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    axios
      .get(`http://127.0.0.1:8000/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setName(response.data.user.firstName));
  }, [name]);
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 relative">
      <label
        htmlFor="file-upload"
        className="
          rounded-xl
          bg-(--btn)
          py-4
          px-20
          text-(--bg)
          transition-colors
          hover:bg-(--btn-gradiant)
          cursor-pointer
          inline-block
          right-0
          absolute
        "
      >
        {fileName ? fileName : "Choose File"}
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="mb-10 ">
        <h1 className=" title">Welcome , {name}</h1>
        <p className="body-text-1 mt-2">
          You have 3 interviews completed,Keep going!
        </p>
      </div>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card title={"Resume"} value={resumeStatus} />
        <Card title={"Score"} value={latestScore} />
        <Card title={"Count"} value={totalInterviewsCount} />
      </div>
      <Button to="/interview-setup">Start New Interview</Button>
    </div>
  );
}

export default HomePage;
