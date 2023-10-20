import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/login",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status == 401) {
          console.log(res.statusText);

          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      return token;
    },

    async session({ token, session }) {
      // console.log({ session, token });

      session.userDetail = token.user;
      session.jwtToken = token.jwtToken;
      session.user = {
        name: token.user.username,
        email: token.user.email,
        image: token.user.profileImage,
      };
      // session.expires = new Date()
      //   .setMinutes(new Date().getMinutes() + 3)
      //   .toString();

      // session.expires = session.te;

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: { maxAge: 86400000, strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
