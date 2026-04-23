"use server";

import { headers } from "next/headers";
import { auth } from "../auth/config";
import type { User } from "@/db/types";

export async function getSession() {
	const res = await auth.api.getSession({
		headers: await headers(),
	});

	return { session: res?.session, user: res?.user as User };
}
