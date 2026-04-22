import { InferSelectModel } from "drizzle-orm";
import { events } from "@/db/schema/ticket";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Event = InferSelectModel<typeof events>;

export function EventCard({ event }: { event: Event }) {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{event.eventName}</CardTitle>
				<CardDescription>{new Date(event.eventDate).toLocaleDateString()}</CardDescription>
			</CardHeader>
			<CardContent>
				<p><strong>Location:</strong> {event.location}</p>
				<p><strong>Tickets Available:</strong> {event.ticketCount}</p>
				{event.minimumAge && <p><strong>Minimum Age:</strong> {event.minimumAge}+</p>}
			</CardContent>
			<CardFooter>
				<Button className="w-full">View Details</Button>
			</CardFooter>
		</Card>
	);
}
