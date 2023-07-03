import { User } from "./user";

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    userRole:string
    userId: number | null
  }