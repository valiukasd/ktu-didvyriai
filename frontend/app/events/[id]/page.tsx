import { getEvent } from "@/lib/data/events";

export default async function EventPage({
<<<<<<< HEAD
  params,
}: {
  params: Promise<{ id: string }>;
=======
	params,
}: {
	params: Promise<{ id: string }>;
>>>>>>> aa1100e812e512d4fb853b70622ce5e40959520c
}) {
	const { id } = await params;
	const event = await getEvent(id);

<<<<<<< HEAD
  return <div>{event.eventName}</div>;
=======
	return <div>{event.eventName}</div>;
>>>>>>> aa1100e812e512d4fb853b70622ce5e40959520c
}
