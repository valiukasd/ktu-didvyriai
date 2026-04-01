import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL in .env file");
}

export const db = drizzle(databaseUrl);

await migrate(db, {
	migrationsFolder: "migrations"
});
