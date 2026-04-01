import { relations, sql } from "drizzle-orm";
import {
	pgTable,
	text,
	timestamp,
	boolean,
	uuid,
	index,
} from "drizzle-orm/pg-core";
import { users } from "./auth";

export const events = pgTable("events", {
	id: uuid("id").default(sql`pg_catalog.gen_random_uuid()`).primaryKey(),
	creatorId: uuid("creator_id").references(() => users.id),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tickets = pgTable("tickets", {
	id: uuid("id").default(sql`pg_catalog.gen_random_uuid()`).primaryKey(),
	userId: uuid("user_id").references(() => users.id),
	eventId: uuid("event_id").references(() => events.id),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
