"use server"

import { db } from "@/db/client";
import { events } from "@/db/schema";
import { eq, gt, lt } from "drizzle-orm";

export async function getEvents(filters?: { upcoming?: boolean }) {
	let query = db.select().from(events);

    if (filters?.upcoming !== undefined) {
        if (filters.upcoming) {
            query.where(gt(events.eventDate, new Date()))
        } else {
             query.where(lt(events.eventDate, new Date()))
        }
    }

    const data = await query;

	return data;
}

export async function getEvent(id: string) {
	const [event] = await db.select().from(events).where(eq(events.id, id));

    return event;
}