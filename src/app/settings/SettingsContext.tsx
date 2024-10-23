import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Role, UserRole } from "@/app/settings/types";

interface SettingsontextType {
  users: User[];
  roles: Role[];
  fetchUsers: () => void;
  fetchRoles: () => void;
  addUser: (user: Omit<User, "id">) => Promise<void>;
  addRole: (roleCode: string) => Promise<void>;
}

const SettingsContext = createContext<SettingsontextType | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user/list");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch("/api/roles");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const addUser = async (user: Omit<User, "id">) => {
    try {
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        fetchUsers();
      } else {
        throw new Error("Error adding user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const addRole = async (roleCode: string) => {
    try {
      const response = await fetch("/api/roles/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: roleCode }),
      });

      if (response.ok) {
        fetchRoles();
      } else {
        throw new Error("Error adding role");
      }
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  return (
    <SettingsContext.Provider
      value={{ users, roles, fetchUsers, fetchRoles, addUser, addRole }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within an SettingsProvider"
    );
  }
  return context;
};
