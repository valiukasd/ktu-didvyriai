import ProfileForm from "@/components/forms/profile-form";
import { getSession } from "@/lib/data/profile";
import { redirect } from "next/navigation";

export default async function Home() {
	const session = await getSession();

	if (!session) redirect("/auth/log-in"); // neprisijunges, redirect i log in

	return (
		<div>
			<h1 className="text-2xl font-semibold tracking-tight">Your Profile</h1>
			<p className="mt-1 text-sm text-muted-foreground">
				Manage your account details.
			</p>
			<ProfileForm user={session.user} />
		</div>
	);
}
