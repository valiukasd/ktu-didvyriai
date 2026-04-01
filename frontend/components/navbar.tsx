"use client";

import { authClient } from "@/lib/auth/client";
import type { User } from "better-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment } from "react/jsx-runtime";

export default function Navbar({ user }: { user?: User }) {
	const router = useRouter();

	return (
		<nav
			style={{
				display: "flex",
				justifyContent: "space-between",
				padding: "20px",
				borderBottom: "1px solid #ccc",
			}}
		>
			<div style={{ fontWeight: "bold" }}>
				<Link href="/">KTU TICKETS</Link>
			</div>
			<div>
				{user ? (
					<Fragment>
						<p>Esate prisijunges kaip: {user.name}</p>
						<button
							onClick={async () => {
								await authClient.signOut({
									fetchOptions: {
										onSuccess: () => {
											router.push("/login");
										},
									},
								});
							}}
							className="cursor-pointer"
						>
							Log out
						</button>
					</Fragment>
				) : (
					<Link href="/registration">Register</Link>
				)}
			</div>
		</nav>
	);
}
