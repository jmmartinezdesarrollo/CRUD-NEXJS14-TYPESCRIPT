"use client";
import { useState } from "react";
import { useSettingsContext } from "@/app/settings/SettingsContext";
import { Role } from "@/app/settings/types";
import { useNotifyComponents } from "@/context/NotifyComponentsProvider";

export default function CreateRole() {
  const [roleCode, setRoleCode] = useState("");
  const { fetchRoles, addRole } = useSettingsContext();
  const { showAlert } = useNotifyComponents();

  const handleAddRole = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addRole(roleCode);
      setRoleCode("");
      showAlert("Role added successfully", "success");
      fetchRoles();
    } catch (error) {
      console.error("Error adding role:", error);
      showAlert("Error adding role", "danger");
    }
  };

  return (
    <div>
      <h2>Add Role</h2>
      <form onSubmit={handleAddRole}>
        <div>
          <label htmlFor="roleCode">Role Code</label>
          <input
            type="text"
            id="roleCode"
            value={roleCode}
            onChange={(e) => setRoleCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Role</button>
      </form>
    </div>
  );
}
