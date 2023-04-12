import { User } from "./user";

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    userId: number | null
  }