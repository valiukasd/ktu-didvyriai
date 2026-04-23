import ProfileForm from "@/components/forms/profile-form";
import { getSession } from "@/lib/data/profile";
import { redirect } from "next/navigation";

export default async function Home() {
	const session = await getSession();

	if (!session.user) redirect("/auth/log-in"); // neprisijunges, redirect i log in

	return (
		<div>
			<div className="flex flex-col gap-2 mb-4">
				<h1 className="text-2xl font-semibold tracking-tight">Your Profile</h1>
				<p className="text-sm text-muted-foreground">
					Manage your account details.
				</p>
			</div>

			<ProfileForm user={session.user} />
		</div>
	);
}
