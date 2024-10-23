"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useNotifyComponents } from "@/context/NotifyComponentsProvider";

const ChangePasswordForm: React.FC = () => {
  const router = useRouter();
  const { showDialog, showAlert } = useNotifyComponents();

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const isButtonDisabled: boolean = useMemo(() => {
    return (
      newPassword === "" ||
      confirmPassword === "" ||
      newPassword !== confirmPassword
    );
  }, [newPassword, confirmPassword]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/login");
    } catch (error) {
      showAlert("An error occurred", "danger");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      showAlert("Passwords do not match", "danger");
      return;
    }

    try {
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        showDialog(
          "Password Changed",
          "Your password was successfully updated.",
          [{ label: "OK", value: "ok", onClick: () => handleLogout() }]
        );
      } else {
        const errorData = await response.json();
        showAlert("An error occurred", "danger");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      showAlert("Error changing password", "danger");
    }
  };
  function test() {
    showAlert("Error changing password", "danger");
  }

  return (
    <>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isButtonDisabled}>
          Change Password
        </button>
      </form>
    </>
  );
};

export default ChangePasswordForm;
