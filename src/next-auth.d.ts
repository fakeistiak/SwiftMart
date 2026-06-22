import type { DefaultSession } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    mobile: string;
    role: "user" | "deliveryBoy" | "admin";
  }
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      mobile: string;
      role: "user" | "deliveryBoy" | "admin";
    };
  }
}
export {};

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    mobile?: string;
    role?: "user" | "deliveryBoy" | "admin";
  }
}
