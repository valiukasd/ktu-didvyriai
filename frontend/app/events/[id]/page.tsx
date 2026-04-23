import { getEvent } from "@/lib/data/events";
import { RegisterTicketButton } from "@/components/events/register-ticket-button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { notFound } from "next/navigation";

export default async function EventPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const { event, ticket } = await getEvent(id);

	if (!event) {
		notFound();
	}

	const eventDate = new Date(event.eventDate);
	const isPastEvent = eventDate < new Date();
	const isSoldOut = event.ticketCount <= 0;

	return (
		<div className="flex w-full max-w-4xl flex-col gap-6 py-8">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex flex-col gap-1">
					<h1 className="text-2xl font-semibold tracking-tight">{event.eventName}</h1>
					<p className="text-sm text-muted-foreground">Event details and your ticket status</p>
				</div>
				<Link href="/" className={buttonVariants({ variant: "outline" })}>
					Back to events
				</Link>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Event information</CardTitle>
						<CardDescription>
							Everything you need before attending this event.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<p>
							<strong>Date:</strong> {eventDate.toLocaleString()}
						</p>
						<p>
							<strong>Location:</strong> {event.location}
						</p>
						<p>
							<strong>Tickets left:</strong> {event.ticketCount}
						</p>
						{event.minimumAge ? (
							<p>
								<strong>Minimum age:</strong> {event.minimumAge}+
							</p>
						) : (
							<p>
								<strong>Minimum age:</strong> No age restriction
							</p>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Your ticket</CardTitle>
						<CardDescription>
							Your registration status for this event.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						{ticket ? (
							<>
								<p className="text-sm text-muted-foreground">You are registered for this event.</p>
								<p>
									<strong>Ticket ID:</strong> {ticket.id}
								</p>
								<p>
									<strong>Registered at:</strong> {new Date(ticket.createdAt).toLocaleString()}
								</p>
							</>
						) : (
							<>
								<p className="text-sm text-muted-foreground">
									You do not have a ticket for this event yet.
								</p>
								{isPastEvent ? (
									<p className="text-sm text-muted-foreground">
										This event has already happened, so registration is closed.
									</p>
								) : isSoldOut ? (
									<p className="text-sm text-muted-foreground">
										This event is sold out.
									</p>
								) : (
									<RegisterTicketButton eventId={event.id} />
								)}
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
