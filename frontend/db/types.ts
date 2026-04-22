import type { InferSelectModel } from "drizzle-orm";
import type { users } from "./schema";

export type User = InferSelectModel<typeof users>;