"use server";

import { parse, type InferOutput } from "valibot";
import { EventSchema } from "../schema";
import { db } from "@/db/client";
import { events } from "@/db/schema";
import { auth } from "../auth/config";
import { headers } from "next/headers";

export async function createEvent(payload: InferOutput<typeof EventSchema>) {
	const session = await auth.api.getSession({
        headers: await headers()
    });

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
