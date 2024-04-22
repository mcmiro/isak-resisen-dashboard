import { getServerSession, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { userService } from "@/server/services/userService";

let jwt: string | undefined = "";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && account.type === "credentials") {
        token.userId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = session.user || {};
      session.user.id = token.userId;

      const sessionWithJwt = { ...session, jwt };

      return sessionWithJwt;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        // Assuming userService.authenticate returns a User or undefined
        const authenticatedUser = await userService.authenticate(
          username,
          password,
        );

        // If authenticated user exists, store it in token for access in session callback
        jwt = authenticatedUser?.jwt;

        // Return the authenticated user or null
        return authenticatedUser || null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
