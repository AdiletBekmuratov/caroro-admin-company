export interface IAuthState {
  user: IUser | null | undefined;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export interface IUser {
  id: number;
  email: string;
  role: Role;
  companyId: number;
  enabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type Role = "admin" | "company" | "user";
