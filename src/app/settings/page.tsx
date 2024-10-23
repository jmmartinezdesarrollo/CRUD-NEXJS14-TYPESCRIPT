"use client";
import { SettingsProvider } from "../settings/SettingsContext";
import CreateUser from "./components/CreateUser";
import UserList from "./components/UserList";
import RolesList from "./components/RolesList";
import AddRole from "./components/CreateRole";

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings Page</h1>
      <SettingsProvider>
        <CreateUser />
        <UserList />
        <RolesList />
        <AddRole />
      </SettingsProvider>
    </div>
  );
}
