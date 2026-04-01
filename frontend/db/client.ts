import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import * as schema from "./schema/index";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("Missing DATABASE_URL in .env file");
}

export const db = drizzle(databaseUrl, { schema });

await migrate(db, {
	migrationsFolder: "migrations",
});
