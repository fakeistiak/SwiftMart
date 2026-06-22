import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDb } from "./lib/db";
import bcrypt from "bcryptjs";
import User from "./models/user.model";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDb();
          const email = credentials.email;
          const password = credentials.password as string;
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("User not found");
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
          };
        } catch {
          throw new Error("Authorization failed");
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDb();
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              name: user.name,
              email: user.email,
              image:user.image
            });
            await newUser.save();
          }
          user.id = existingUser ? existingUser._id.toString() : newUser._id.toString();
          user.mobile = existingUser ? existingUser.mobile : "";
          user.role = existingUser ? existingUser.role : "user";
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          throw new Error("Google sign-in failed");
        }
      }
      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.mobile = user.mobile;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.mobile = token.mobile as string;
        session.user.role = token.role as "user" | "deliveryBoy" | "admin";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
});
