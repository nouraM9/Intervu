import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import logo from "../assets/logo.png";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import React from "react";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [id, setId] = useLocalStorageState<number>("id", { defaultValue: 0 });
  const [token, setToken] = useLocalStorageState<string>("authToken", {
    defaultValue: "",
  });
  const [error, setError] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      })
      .then((response) => {
        const receivedToken = response.data.token;
        const receivedId = response.data.user.id;

        setId(receivedId);
        setToken(receivedToken);
        toast.success("Login successful");
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          setError("Wrong email or password.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      });
  };
  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <div className="flex min-h-screen justify-center items-center">
        <div className="w-full max-w-md border border-(--border) rounded-2xl shadow-(--card-shadow) bg-white px-8 py-16">
          {error && (
            <span className="text-red-500 text-sm flex justify-center ">
              {error}
            </span>
          )}
          <div className="flex justify-center gap-4 text-center items-center heading-1  mb-4">
            <img src={logo} alt="Intervu logo" className="w-13 h-11.5" />
            <span>Intervu</span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="mb-4">
              <label className=" mb-2 block">Email</label>
              <input
                type="email"
                className={`w-full px-4 py-3 rounded-xl ${error ? " border border-red-700" : "border border-(--border)"}`}
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onClick={() => setError("")}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block">Password</label>
              <input
                type="password"
                className={`w-full px-4 py-3 rounded-xl ${error ? "border border-red-700" : "border border-(--border)"}`}
                placeholder="*******"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onClick={() => setError("")}
              />
            </div>
            <div className="text-right">
              <span className="text-(--btn) hover:cursor-pointer hover:text-(--btn-gradiant)">
                Forgot Password?
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-(--light-text)" />

              <span className="body-text-1 text-(--body-text-2)">OR</span>

              <div className="h-px flex-1 bg-(--light-text)" />
            </div>

            <div className="flex justify-center">
              <Button type="submit">Login</Button>
            </div>
            <div className="text-center">
              <Link
                to="./sign-up"
                className="text-(--btn) hover:cursor-pointer hover:text-(--btn-gradiant)"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
