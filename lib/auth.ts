import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db/mongoose";
import User from "@/lib/modules/users/model";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        console.log("USER FOUND:", user?.email);
        console.log("HASH:", user?.password);

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        console.log("PASSWORD VALID:", isValid);

        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          isActive: user.isActive,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isActive = user.isActive;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isActive = token.isActive;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
