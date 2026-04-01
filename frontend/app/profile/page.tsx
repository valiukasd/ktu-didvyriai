import ProfileForm from "@/components/forms/profile-form";

export default function Home() {
	return (
		<div>
			<h1 className="text-2xl font-semibold tracking-tight">Your Profile</h1>
			<p className="mt-1 text-sm text-muted-foreground">
				Manage your account details.
			</p>
			<ProfileForm />
		</div>
	);
}
