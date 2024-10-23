"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormInputs } from "../types/types";
import "../styles/loginForm.css";
import { useNotifyComponents } from "@/context/NotifyComponentsProvider";

export default function LoginForm() {
  const router = useRouter();
  const { showAlert } = useNotifyComponents();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [formData, setFormData] = useState<LoginFormInputs>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsButtonDisabled(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/");
        setIsButtonDisabled(false);
      } else {
        showAlert("Error to login", "danger");
        setIsButtonDisabled(false);
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
      showAlert("An unexpected error occurred", "danger");
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <h1>Login to {process.env.NEXT_PUBLIC_APP_NAME}</h1>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button disabled={isButtonDisabled} type="submit">
            Login
          </button>
        </div>
      </form>
    </>
  );
}
