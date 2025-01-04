import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { AUTHOR_BY_GITHUB_ID_QUERY, AUTHOR_BY_GOOGLE_ID_QUERY } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn Callback:", { user, account, profile }); // Debug log
      
      if (!profile) return false;
      
      const id = account.provider === "github" ? profile.id : profile.sub;
      console.log("Generated ID:", id); // Debug log

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(account.provider === "github" ? AUTHOR_BY_GITHUB_ID_QUERY : AUTHOR_BY_GOOGLE_ID_QUERY, {
          id: String(id),
        });
      
      console.log("Existing User:", existingUser); // Debug log

      if (!existingUser) {
        const newUser = await writeClient.create({
          _type: "author",
          id: String(id),
          name: user.name,
          username: account.provider === "github" ? profile.login : user.email?.split("@")[0],
          email: user.email,
          image: user.image,
          bio: profile.bio || "",
        });
        console.log("New User Created:", newUser); // Debug log
      }

      return true;
    },
    async jwt({ token, user, account, profile }) {
      console.log("JWT Callback:", { token, user, account, profile }); // Debug log
      
      if (profile) {
        const id = account.provider === "github" ? profile.id : profile.sub;
        token.id = String(id);
        console.log("Updated Token:", token); // Debug log
      }
      
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback:", { session, token }); // Debug log
      
      if (token?.id) {
        session.user.id = token.id;
        console.log("Updated Session:", session); // Debug log
      }
      
      return session;
    }
  }
});