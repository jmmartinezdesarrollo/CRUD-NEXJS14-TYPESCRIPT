"use client";
import { useState, useEffect } from "react";
import ChangePasswordForm from "./components/ChangePasswordForm";
import { User } from "./types";

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/me");
        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Hello, {user.username}</h1>
      <div style={{ display: "flex", gap: "50px" }}>
        <div>
          <strong>Roles:</strong>
          <ul>
            {user.roles.map((item, index) => (
              <li key={index}>
                <span>{item.role.code}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Admin: </strong>
          <span> {user.isAdmin.toString()}</span>
        </div>
      </div>
      <ChangePasswordForm />
    </div>
  );
}
