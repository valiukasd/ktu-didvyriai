"use server";

import { db } from "@/db/client";
import { users } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "./config";

export const getSession = async () =>
	auth.api.getSession({
		headers: await headers(),
	});

export const updateProfile = async (data: { name: string; email: string }) => {
	const session = await getSession();

	if (!session?.user) {
		throw new Error("Unauthorized");
	}

	// Check if email is already taken by another user
	if (data.email !== session.user.email) {
		const existingUser = await db
			.select()
			.from(users)
			.where(eq(users.email, data.email))
			.limit(1);

		if (existingUser.length > 0) {
			throw new Error("Email is already in use");
		}
	}

	// Update user
	const updatedUser = await db
		.update(users)
		.set({
			name: data.name,
			email: data.email,
		})
		.where(eq(users.id, session.user.id))
		.returning();

	return updatedUser[0];
};
