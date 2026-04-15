import { relations, sql } from "drizzle-orm";
import {
	pgTable,
	text,
	timestamp,
	boolean,
	uuid,
	index,
	integer,
} from "drizzle-orm/pg-core";
import { users } from "./auth";

export const events = pgTable("events", {
	id: uuid("id").defaultRandom().primaryKey(),
	creatorId: uuid("creator_id")
		.references(() => users.id)
		.notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
	eventName: text("event_name").notNull(),
	ticketCount: integer("ticket_count").notNull(),
	location: text("location").notNull(),
	eventDate: timestamp("event_date").notNull(),
	minimumAge: integer("minimum_age"),
});

export const tickets = pgTable("tickets", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: uuid("user_id").references(() => users.id),
	eventId: uuid("event_id").references(() => events.id),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
