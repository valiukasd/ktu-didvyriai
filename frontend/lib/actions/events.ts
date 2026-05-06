"use server";

import { parse, type InferOutput } from "valibot";
import { EventSchema } from "../schema";
import { db } from "@/db/client";
import { events } from "@/db/schema";
import { auth } from "../auth/config";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createEvent(payload: InferOutput<typeof EventSchema>) {
	const session = await auth.api.getSession({
		headers: await headers(),
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

export async function updateEvent(
	id: string,
	payload: InferOutput<typeof EventSchema>,
) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		throw new Error("Unauthorized");
	}

	const values = parse(EventSchema, payload);

	const [event] = await db
		.update(events)
		.set({ ...values })
		.where(and(eq(events.id, id), eq(events.creatorId, session.user.id)))
		.returning();

	return event;
}

export async function deleteEvent(id: string) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		throw new Error("Unauthorized");
	}

	await db
		.delete(events)
		.where(and(eq(events.id, id), eq(events.creatorId, session.user.id)));
	revalidatePath("/events");
}
