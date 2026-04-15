ALTER TABLE "events" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "creator_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "event_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "event_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "ticket_count" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "location" text NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "event_date" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "minimum_age" integer;