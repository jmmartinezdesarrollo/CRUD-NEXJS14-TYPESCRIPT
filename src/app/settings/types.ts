export interface Role {
  id: number;
  code: string;
}

export interface UserRole {
  id: number;
  userId: number;
  roleId: number;
  role: Role;
}

export interface User {
  id: number;
  username: string;
  roles: UserRole[];
  isAdmin: boolean;
  password: string;
}

export interface UserFormProps {
  roles: Role[];
}

interface SettingsContextType {
  users: User[];
  roles: Role[];
  fetchUsers: () => void;
  fetchRoles: () => void;
  addUser: (user: Omit<User, "id">) => Promise<void>;
  addRole: (roleCode: string) => Promise<void>;
}
