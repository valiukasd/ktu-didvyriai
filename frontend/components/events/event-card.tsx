import { InferSelectModel } from "drizzle-orm";
import { events } from "@/db/schema/ticket";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { deleteEvent } from "@/lib/actions/events";
import Link from "next/link";

type Event = InferSelectModel<typeof events>;

export function EventCard({ event, isOwner = false }: { event: Event; isOwner?: boolean }) {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{event.eventName}</CardTitle>
				<CardDescription>
					{new Date(event.eventDate).toLocaleDateString()}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>
					<strong>Location:</strong> {event.location}
				</p>
				<p>
					<strong>Tickets Available:</strong> {event.ticketCount}
				</p>
				{event.minimumAge && (
					<p>
						<strong>Minimum Age:</strong> {event.minimumAge}+
					</p>
				)}
			</CardContent>
			<CardFooter className="flex flex-row flex-wrap gap-2">
				<Link
					className={buttonVariants({ className: "w-full sm:w-auto", variant: isOwner ? "secondary" : "default" })}
					href={`/events/${event.id}`}
				>
					{isOwner ? "View" : "View Details"}
				</Link>
				{isOwner && (
					<>
						<Link
							href={`/events/${event.id}/edit`}
							className={buttonVariants({ variant: "outline", className: "w-full sm:w-auto" })}
						>
							Edit
						</Link>
						<form
							action={async () => {
								"use server";
								await deleteEvent(event.id);
							}}
							className="w-full sm:w-auto"
						>
							<Button variant="destructive" type="submit" className="w-full">
								Delete
							</Button>
						</form>
					</>
				)}
			</CardFooter>
		</Card>
	);
}
