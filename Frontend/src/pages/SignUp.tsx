import Button from "../components/Button";
import logo from "../assets/logo.png";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/sign-up", {
        firstName,
        lastName,
        email,
        password,
        role_id: role,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };
  return (
    <div className="mx-auto max-w-7xl px-8 py-16">
      <div className="flex justify-center items-center  min-h-screen">
        <div className="max-w-lg w-full border border-(--border) shadow-(--card-shadow) bg-white py-16 px-8 rounded-2xl  ">
          <div className="flex justify-center gap-4 text-center items-center heading-1  mb-4">
            <img src={logo} alt="Intervu logo" className="w-13 h-11.5" />
            <span>Intervu</span>
          </div>
          <div className="text-center heading-2 mb-4">
            <span>Create Your Account</span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="mb-4">
              <label className=" mb-2 block">First Name</label>
              <input
                type="text"
                className="w-full rounded-xl border border-(--border) px-4 py-3"
                placeholder="Jhon"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className=" mb-2 block">Last Name</label>
              <input
                type="text"
                className="w-full rounded-xl border border-(--border) px-4 py-3"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className=" mb-2 block">Email</label>
              <input
                type="email"
                className="w-full rounded-xl border border-(--border) px-4 py-3"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block">Password</label>
              <input
                type="password"
                className="w-full rounded-xl border border-(--border) px-4 py-3"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <Button type="submit">Create Account</Button>
            </div>
            <div className="text-center">
              <span className="text-(--btn) hover:cursor-pointer hover:text-(--btn-gradiant)">
                Already have an account ? login
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
