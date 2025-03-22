import NextAuth, { type NextAuthResult } from "next-auth";
import Google from "next-auth/providers/google";

const result = NextAuth({
  providers: [Google],
});

export const handlers: NextAuthResult["handlers"] = result.handlers;
export const signIn: NextAuthResult["signIn"] = result.signIn;
export const signOut: NextAuthResult["signOut"] = result.signOut;
