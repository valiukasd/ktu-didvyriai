"use server";

import { parse, type InferOutput } from "valibot";
import { authClient } from "../auth/client";
import { EventSchema } from "../schema";
import { db } from "@/db/client";
import { events } from "@/db/schema";

export async function createEvent(payload: InferOutput<typeof EventSchema>) {
	const { data: session } = await authClient.getSession();

	if (!session) {
		throw new Error("Unauthorized"); // Zmogus neprisijunges
	}

	const values = parse(EventSchema, payload);

	const [event] = await db
		.insert(events)
		.values({ ...values, creatorId: session.user.id })
		.returning();

	return event;
}
