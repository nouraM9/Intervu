import { useEffect, useState } from "react";
import pdfToText from "react-pdftotext";
import axios from "axios";
import useLocalStorageState from "use-local-storage-state";
import toast from "react-hot-toast";

export function useResume() {
  const [resumeStatus, setResumeStatus] = useState<string>("✖️ Not Uploaded");
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token] = useLocalStorageState("authToken", { defaultValue: "" });
  const [id] = useLocalStorageState("id", { defaultValue: 0 });

  // Check on mount whether a resume already exists for this user
  useEffect(() => {
    const checkResume = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/users/${id}/resume`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setResumeStatus("Uploaded ✔️");
        setFileName(res?.data?.original_file_name ?? null);
      } catch (error) {
        console.error(error); // now it's "used"

        toast.error("no resume exists yet");
      }
    };

    if (id && token) {
      checkResume();
    }
  }, [id, token]);

  const prepareFormData = async (file: File) => {
    const text = await pdfToText(file);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("extracted_text", text);
    formData.append("original_file_name", file.name);
    return formData;
  };

  const uploadResume = async (file: File) => {
    setLoading(true);
    setFileName(file.name);
    try {
      const formData = await prepareFormData(file);
      const res = await axios.post(
        "http://127.0.0.1:8000/api/upload-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("uploaded:", res.data);
      setResumeStatus("Uploaded ✔️");
    } catch (error) {
      console.log("upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateResume = async (file: File) => {
    setLoading(true);
    setFileName(file.name);
    try {
      const formData = await prepareFormData(file);
      const res = await axios.post(
        "http://127.0.0.1:8000/api/update-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("updated:", res.data);
      setResumeStatus("Uploaded ✔️");
    } catch (error) {
      console.log("update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    resumeStatus,
    fileName,
    loading,
    uploadResume,
    updateResume,
  };
}
