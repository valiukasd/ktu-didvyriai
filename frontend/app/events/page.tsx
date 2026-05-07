import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getMyEvents } from "@/lib/data/events";
import { EventCard } from "@/components/events/event-card";
import Link from "next/link";

export default async function MyEventsPage() {
	const events = await getMyEvents();

	return (
		<div className="flex w-full max-w-4xl flex-col gap-6 py-8">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex flex-col gap-1">
					<h1 className="text-2xl font-semibold tracking-tight">My events</h1>
					<p className="text-sm text-muted-foreground">
						Events you have created.
					</p>
				</div>
				<Link className={buttonVariants()} href="/events/create">
					Create an event
				</Link>
			</div>

			{events.length === 0 ? (
				<Card>
					<CardHeader>
						<CardTitle>No events yet</CardTitle>
						<CardDescription>
							When you create an event, it will appear here.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href="/events/create" className={buttonVariants()}>
							Create an event
						</Link>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{events.map((event) => (
						<EventCard key={event.id} event={event} isOwner={true} />
					))}
				</div>
			)}
		</div>
	);
}
