import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyTickets } from "@/lib/data/tickets";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function MyTicketsPage() {
	const tickets = await getMyTickets();

	return (
		<div className="flex w-full max-w-4xl flex-col gap-6 py-8">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex flex-col gap-1">
					<h1 className="text-2xl font-semibold tracking-tight">My tickets</h1>
					<p className="text-sm text-muted-foreground">
						Tickets you have registered for.
					</p>
				</div>
				<Link href="/" className={buttonVariants({ variant: "outline" })}>
					Browse events
				</Link>
			</div>

			{tickets.length === 0 ? (
				<Card>
					<CardHeader>
						<CardTitle>No tickets yet</CardTitle>
						<CardDescription>
							When you register for an event, your ticket will appear here.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href="/" className={buttonVariants()}>
							Find an event
						</Link>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{tickets.map(({ ticket, event }) => (
						<Card key={ticket.id}>
							<CardHeader>
								<CardTitle>{event.eventName}</CardTitle>
								<CardDescription>
									{new Date(event.eventDate).toLocaleString()}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<p>
									<strong>Location:</strong> {event.location}
								</p>
								<p>
									<strong>Ticket ID:</strong> {ticket.id}
								</p>
								<p>
									<strong>Registered at:</strong>{" "}
									{new Date(ticket.createdAt).toLocaleString()}
								</p>
								<div className="pt-2">
									<Link
										href={`/events/${event.id}`}
										className={buttonVariants({ variant: "secondary" })}
									>
										View event
									</Link>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
