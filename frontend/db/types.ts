import type { InferSelectModel } from "drizzle-orm";
import type { tickets, users } from "./schema";

export type User = InferSelectModel<typeof users>;
export type Ticket = InferSelectModel<typeof tickets>;