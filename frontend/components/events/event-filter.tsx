"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "../ui/button";

export function EventFilter() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const isUpcoming = searchParams.get("upcoming") !== "false";

	const setFilter = useCallback(
		(upcoming: boolean) => {
			const params = new URLSearchParams(searchParams.toString());
			if (upcoming) {
				params.delete("upcoming"); // Default is true, so empty means true
			} else {
				params.set("upcoming", "false");
			}
			router.push(`/?${params.toString()}`);
		},
		[router, searchParams],
	);

	return (
		<div className="flex gap-2">
			<Button
				variant={isUpcoming ? "default" : "outline"}
				onClick={() => setFilter(true)}
			>
				Upcoming
			</Button>
			<Button
				variant={!isUpcoming ? "default" : "outline"}
				onClick={() => setFilter(false)}
			>
				Past Events
			</Button>
		</div>
	);
}
