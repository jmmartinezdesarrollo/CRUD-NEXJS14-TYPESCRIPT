export interface Role {
  role: {
    code: string;
  };
}

export interface User {
  username: string;
  roles: Role[];
  isAdmin: boolean;
}