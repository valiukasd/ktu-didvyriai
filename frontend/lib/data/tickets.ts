"use server";

import { db } from "@/db/client";
import { events, tickets } from "@/db/schema";
import { auth } from "@/lib/auth/config";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getEventWithTicketInfo(eventId: string) {
    const [event] = await db
        .select()
        .from(events)
        .where(eq(events.id, eventId));

    if (!event) {
        return null;
    }

    const registeredTickets = await db
        .select()
        .from(tickets)
        .where(eq(tickets.eventId, eventId));

    const availableTickets = event.ticketCount - registeredTickets.length;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    let isUserRegistered = false;
    if (session) {
        const [userTicket] = await db
            .select()
            .from(tickets)
            .where(
                and(
                    eq(tickets.userId, session.user.id),
                    eq(tickets.eventId, eventId)
                )
            );
        isUserRegistered = !!userTicket;
    }

    return {
        event,
        registeredCount: registeredTickets.length,
        availableTickets,
        isUserRegistered,
    };
}
