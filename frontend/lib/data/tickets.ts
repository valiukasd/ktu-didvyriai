"use server";

import { db } from "@/db/client";
import { events, tickets } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getSession } from "./profile";

export async function getMyTickets() {
	const session = await getSession();

	if (!session.user) {
		return [];
	}

	const data = await db
		.select({
			ticket: tickets,
			event: events,
		})
		.from(tickets)
		.innerJoin(events, eq(tickets.eventId, events.id))
		.where(eq(tickets.userId, session.user.id));

	return data;
}
