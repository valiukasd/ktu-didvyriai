"use server";

import { db } from "@/db/client";
import { events, tickets } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "../auth/config";

export async function registerToEvent(eventId: string) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		throw new Error("Unauthorized");
	}

	const userId = session.user.id;

	const ticket = await db.transaction(async (tx) => {
		//check if event exists
		const [eventData] = await tx
			.select()
			.from(events)
			.where(eq(events.id, eventId));

		if (!eventData) {
			tx.rollback();
			throw new Error("Event not found");
		}

		// check if user already registered
		const [existingTicket] = await tx
			.select()
			.from(tickets)
			.where(and(eq(tickets.userId, userId), eq(tickets.eventId, eventId)));

		if (existingTicket) {
			tx.rollback();
			throw new Error("You are already registered for this event");
		}

		if (eventData.ticketCount === 0) {
			tx.rollback();
			throw new Error("No more tickets available for this event");
		}

		// create ticket
		const [newTicket] = await tx
			.insert(tickets)
			.values({
				userId,
				eventId,
			})
			.returning();

		await tx
			.update(events)
			.set({ ticketCount: eventData.ticketCount - 1 })
			.where(eq(events.id, eventData.id));

		return newTicket;
	});

	return ticket;
}
