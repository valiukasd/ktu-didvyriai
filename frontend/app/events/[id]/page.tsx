import { buttonVariants } from "@/components/ui/button";
import { getEvent } from "@/lib/data/events";
import Link from "next/link";

export default async function EventPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const event = await getEvent(id);

	return (
		<div>
            {event.eventName}
		</div>
	);
}