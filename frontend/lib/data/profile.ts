"use server";

import { headers } from "next/headers";
import { auth } from "../auth/config";

export async function getSession() {
	return await auth.api.getSession({
		headers: await headers(),
	});
}
