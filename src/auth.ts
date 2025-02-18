import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import { compareSync } from "bcryptjs";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: {
            active: true,
            email: email.toLowerCase(),
          },
        });

        if (!user) return null;

        if (!compareSync(password, user.password)) return null;

        // regresar el usuario sin el password
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/account",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.data = user;
      }

      return token;
    },
    session: ({ session, token, user }) => {
      session.user = token.data as any;

      return session;
    },

    signIn: async ({ credentials }) => {
      return true;
    },
  },
});
