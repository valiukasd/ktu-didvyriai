import Link from "next/link";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center font-sans ">
			<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
				<Link href="/events/create">Create event</Link>
			</div>
		</div>
	);
}
