import { EventForm } from "@/components/forms/event-form";
import { getEvent } from "@/lib/data/events";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/data/profile";

export default async function EditEventPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const resolvedParams = await params;
	const session = await getSession();

	if (!session.user) {
		return notFound();
	}

	const { event } = await getEvent(resolvedParams.id);

	if (!event || event.creatorId !== session.user.id) {
		return notFound();
	}

	const initialData = {
		eventName: event.eventName,
		location: event.location,
		ticketCount: event.ticketCount,
		eventDate: new Date(event.eventDate),
	};

	return <EventForm initialData={initialData} eventId={event.id} />;
}
