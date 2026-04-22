"use server";

import { db } from "@/db/client";
import { events, tickets } from "@/db/schema";
import { and, eq, gt, lt } from "drizzle-orm";
import { getSession } from "./profile";

export async function getEvents(filters?: { upcoming?: boolean }) {
	let query = db.select().from(events);

	if (filters?.upcoming !== undefined) {
		if (filters.upcoming) {
			query.where(gt(events.eventDate, new Date()));
		} else {
			query.where(lt(events.eventDate, new Date()));
		}
	}

	const data = await query;

	return data;
}

export async function getEvent(id: string) {
	const session = await getSession();

	const [event] = await db.select().from(events).where(eq(events.id, id));

	if (session?.user) {
		const [ticket] = await db
			.select()
			.from(tickets)
			.where(
				and(
					eq(tickets.eventId, event.id),
					eq(tickets.userId, session?.user.id),
				),
			);

		return { event, ticket };
	}

	return { event };
}
