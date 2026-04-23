import { EventCard } from "@/components/events/event-card";
import { EventFilter } from "@/components/events/event-filter";
import { getEvents } from "@/lib/data/events";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const params = await searchParams;
	const isUpcoming = params.upcoming !== "false";
	const events = await getEvents({ upcoming: isUpcoming });

	return (
		<div className="flex flex-col gap-6 w-full max-w-4xl mx-auto py-8">
			<div className="flex flex-row flex-wrap gap-4 justify-between items-center w-full">
				<h1 className="text-2xl font-semibold">
					{isUpcoming ? "Upcoming" : "Past"} events
				</h1>
				<EventFilter />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{events.map((event) => (
					<EventCard key={event.id} event={event} />
				))}
				{events.length === 0 && (
					<div className="col-span-1 md:col-span-2 text-center text-muted-foreground py-10">
						No events found.
					</div>
				)}
			</div>
		</div>
	);
}
