"use client";

import { authClient } from "@/lib/auth/client";
import type { User } from "better-auth";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Navbar({ user }: { user?: User }) {
	return (
		<nav className="flex justify-between border-b border-border px-4 py-3">
			<div className="flex items-center">
				<Link href="/">KTU TICKETS</Link>
			</div>
			<div>
				{user ? (
					<div className="flex flex-row gap-4">
						<Link className={buttonVariants()} href={"/tickets"}>
							My Tickets
						</Link>
						<Link className={buttonVariants({variant: "secondary"})} href={"/events"}>
							My Events
						</Link>
						
						<Link
							className={buttonVariants({ variant: "secondary" })}
							href={"/profile"}
						>
							Account
						</Link>
						<button
							onClick={async () => {
								await authClient.signOut({
									fetchOptions: {
										onSuccess: () => {
											window.location.replace("/");
										},
									},
								});
							}}
							className="cursor-pointer"
						>
							Log out
						</button>
					</div>
				) : (
					<div className="flex flex-row gap-4">
						<Link
							href="/auth/log-in"
							className={buttonVariants({ variant: "secondary" })}
						>
							Log in
						</Link>
						<Link href="/auth/register" className={buttonVariants()}>
							Register
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
}
