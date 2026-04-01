"use server"

import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/client";

export const auth = betterAuth({
  plugins: [nextCookies()],
   database: drizzleAdapter(db, {
        provider: "pg",
    }),
    usePlural: true,
  emailAndPassword: { 
    enabled: true, 
  },
  advanced: {
    database: {
      generateId: "uuid"
    },
  },
});