import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { AUTHOR_BY_GITHUB_ID_QUERY, AUTHOR_BY_GOOGLE_ID_QUERY } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { name, email, image } = user;
      let id, login, bio;

      if (account?.provider === "github" && profile) {
        id = profile.id;
        login = profile.login;
        bio = profile?.bio || "";
      } else if (account?.provider === "google" && profile) {
        id = profile.sub;
        login = profile.email?.split("@")[0] || "";
        bio = profile.bio || "";
      }

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(account?.provider === "github" ? AUTHOR_BY_GITHUB_ID_QUERY : AUTHOR_BY_GOOGLE_ID_QUERY, {
          id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },
  },
});