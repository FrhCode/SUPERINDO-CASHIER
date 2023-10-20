/* eslint-disable no-unused-vars */
import { JWT } from "next-auth/jwt";

interface AuthResponse {
  userDetail: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    profileImage: string;
    enabled: boolean;
    username: string;
    authorities: { authority: string }[];
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    created_date: string;
    updated_date: string;
  };
  jwtToken: string;
  tes: string;
}

declare module "next-auth" {
  interface Session extends AuthResponse {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user: AuthResponse["userDetail"];
    jwtToken: AuthResponse["jwtToken"];
  }
}
