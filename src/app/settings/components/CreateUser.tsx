"use client";
import { useState } from "react";
import { UserRole } from "../types";
import { useNotifyComponents } from "@/context/NotifyComponentsProvider";
import { useSettingsContext } from "@/app/settings/SettingsContext";

export default function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { showAlert } = useNotifyComponents();
  const { roles, addUser } = useSettingsContext();

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      showAlert("Username and password are required.", "danger");
      return;
    }

    if (selectedRoles.length === 0) {
      showAlert("At least one role must be selected.", "danger");
      return;
    }
    const userRoles: UserRole[] = selectedRoles.map((roleId) => ({
      id: 0,
      userId: 0,
      roleId,
      role: roles.find((r) => r.id === roleId)!,
    }));

    try {
      await addUser({
        username,
        password,
        roles: userRoles,
        isAdmin,
      });
      setUsername("");
      setPassword("");
      setSelectedRoles([]);
      setIsAdmin(false);
      showAlert("User created successfully", "success");
    } catch (error) {
      console.error("Error creating user:", error);
      showAlert("Error creating user", "danger");
    }
  };

  const handleRoleChange = (roleId: number) => {
    setSelectedRoles((prevSelectedRoles) =>
      prevSelectedRoles.includes(roleId)
        ? prevSelectedRoles.filter((id) => id !== roleId)
        : [...prevSelectedRoles, roleId]
    );
  };

  return (
    <form onSubmit={handleCreateUser}>
      <h2>Create user</h2>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Roles</label>
        {roles.map((role) => (
          <div key={role.id}>
            <input
              type="checkbox"
              id={`role-${role.id}`}
              value={role.id}
              checked={selectedRoles.includes(role.id)}
              onChange={() => handleRoleChange(role.id)}
            />
            <label htmlFor={`role-${role.id}`}>{role.code}</label>
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="isAdmin">Admin</label>
        <input
          type="checkbox"
          id="isAdmin"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
      </div>
      <button type="submit">Create User</button>
    </form>
  );
}
