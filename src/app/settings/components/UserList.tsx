"use client";
import { useState, useEffect } from "react";
import { useSettingsContext } from "@/app/settings/SettingsContext";
import { User } from "@/app/settings/types";

export default function UserList() {
  const { users, roles, fetchUsers } = useSettingsContext();
  const [localUsers, setLocalUsers] = useState<User[]>([]);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await fetch(`/api/user/delete/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdateUser = async (user: User) => {
    try {
      const response = await fetch(`/api/user/modify/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          username: user.username,
          isAdmin: user.isAdmin,
          roles: user.roles.map((UserRole) => UserRole.roleId),
          password: user.password,
        }),
      });

      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleRoleChange = (userId: number, roleId: number) => {
    setLocalUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              roles: user.roles.some((role) => role.roleId === roleId)
                ? user.roles.filter((role) => role.roleId !== roleId)
                : [
                    ...user.roles,
                    {
                      id: Date.now(),
                      userId,
                      roleId,
                      role: roles.find((r) => r.id === roleId)!,
                    },
                  ],
            }
          : user
      )
    );
  };

  const handleAdminChange = (userId: number, isAdmin: boolean) => {
    setLocalUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isAdmin } : user
      )
    );
  };

  const handlePasswordChange = (userId: number, password: string) => {
    setLocalUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, password } : user
      )
    );
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Roles</th>
            <th>Admin</th>
            <th>Password</th>
            <th>Actions</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {localUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>
                {roles.map((role) => (
                  <div key={role.id}>
                    <input
                      type="checkbox"
                      id={`role-${user.id}-${role.id}`}
                      checked={user.roles.some((r) => r.roleId === role.id)}
                      onChange={() => handleRoleChange(user.id, role.id)}
                    />
                    <label htmlFor={`role-${user.id}-${role.id}`}>
                      {role.code}
                    </label>
                  </div>
                ))}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={user.isAdmin}
                  onChange={(e) => handleAdminChange(user.id, e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="password"
                  value={user.password || ""}
                  onChange={(e) =>
                    handlePasswordChange(user.id, e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => handleUpdateUser(user)}>Update</button>
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
