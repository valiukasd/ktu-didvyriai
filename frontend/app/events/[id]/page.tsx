import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function EventPage() {
	return (
		<div>
			<div className="flex flex-row justify-between items-center">
				<h1 className="text-2xl font-semibold">My events</h1>
				<Link className={buttonVariants()} href="/events/create">
					Create an event
				</Link>
			</div>
			This page should show the events of the user that he created
		</div>
	);
}