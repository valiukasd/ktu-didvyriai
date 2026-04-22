"use client";

import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./config";

export const authClient = createAuthClient({
	plugins: [nextCookies(), inferAdditionalFields<typeof auth>()],
});
