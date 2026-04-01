import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./migrations",
	schema: "./db/schema/index.ts",
	dialect: "postgresql",
});
