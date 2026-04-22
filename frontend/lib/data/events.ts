"use server";

import { db } from "@/db/client";
import { events } from "@/db/schema";
import { gt, lt } from "drizzle-orm";
import { getSession } from "./profile";

export async function getEvents(filters?: { upcoming?: boolean }) {
    const query = db.select().from(events);

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

    return event;
}
