"use client";
import { useSettingsContext } from "@/app/settings/SettingsContext";
import { useNotifyComponents } from "@/context/NotifyComponentsProvider";
import { Role } from "@/app/settings/types";

export default function RolesList() {
  const { roles, fetchRoles } = useSettingsContext();
  const { showAlert } = useNotifyComponents();

  const handleDeleteRole = async (roleId: number) => {
    try {
      const response = await fetch(`/api/roles/delete/${roleId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchRoles();
        showAlert("Role deleted successfully", "success");
      } else {
        showAlert("Error deleting role", "danger");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      showAlert("Error deleting role", "danger");
    }
  };

  return (
    <div>
      <h2>Roles List</h2>
      <table>
        <thead>
          <tr>
            <th>Role ID</th>
            <th>Role Code</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role: Role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.code}</td>
              <td>
                <button onClick={() => handleDeleteRole(role.id)}>
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
