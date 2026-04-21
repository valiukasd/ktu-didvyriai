"use client";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";
import { ProfileSchema } from "@/lib/schema";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as v from "valibot";

export default function ProfileForm() {
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

	const profileForm = useForm({
		defaultValues: {
			name: currentUser?.name ?? "",
			email: currentUser?.email ?? "",
		},
		onSubmit: async ({ value }) => {
			const result = v.safeParse(ProfileSchema, value);
			if (!result.success) {
				toast.error(result.issues[0].message);
				return;
			}
			try {
				const res = await fetch("/api/auth/update-profile", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(result.output),
				});

				if (!res.ok) {
					toast.error("Failed to update profile");
					return;
				}

				toast.success("Profile updated successfully.");
			} catch {
				toast.error("Something went wrong. Please try again.");
			}
		},
	});

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const session = await authClient.getSession();
				if (session?.data?.user) {
					setCurrentUser({
						name: session.data.user.name ?? "",
						email: session.data.user.email ?? "",
					});
					profileForm.setFieldValue("name", session.data.user.name ?? "");
					profileForm.setFieldValue("email", session.data.user.email ?? "");
				}
			} catch (error) {
				console.error("Failed to load user:", error);
				toast.error("Failed to load user data");
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, [profileForm]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
			<div className="flex w-full max-w-lg flex-col gap-10 px-4 py-12">
				{loading ? (
					<div className="text-center">Loading profile...</div>
				) : (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							profileForm.handleSubmit();
						}}
					>
						<FieldGroup>
							<FieldSet>
								<FieldLegend>Personal Information</FieldLegend>
								<FieldDescription>
									Update your display name and email address.
								</FieldDescription>
								<FieldGroup>
									<profileForm.Field name="name">
										{(field) => {
											const result = v.safeParse(
												ProfileSchema.entries.name,
												field.state.value,
											);
											const error =
												!result.success && field.state.meta.isDirty
													? result.issues[0].message
													: undefined;
											return (
												<Field>
													<FieldLabel htmlFor="profile-name">
														Full Name
													</FieldLabel>
													<Input
														id="profile-name"
														placeholder="Your full name"
														autoComplete="name"
														value={field.state.value}
														onChange={(e) => field.handleChange(e.target.value)}
														onBlur={field.handleBlur}
													/>
													<FieldError
														errors={error ? [{ message: error }] : []}
													/>
												</Field>
											);
										}}
									</profileForm.Field>

									<profileForm.Field name="email">
										{(field) => {
											const result = v.safeParse(
												ProfileSchema.entries.email,
												field.state.value,
											);
											const error =
												!result.success && field.state.meta.isDirty
													? result.issues[0].message
													: undefined;
											return (
												<Field>
													<FieldLabel htmlFor="profile-email">
														Email Address
													</FieldLabel>
													<Input
														id="profile-email"
														type="email"
														placeholder="you@example.com"
														autoComplete="email"
														value={field.state.value}
														onChange={(e) => field.handleChange(e.target.value)}
														onBlur={field.handleBlur}
													/>
													<FieldError
														errors={error ? [{ message: error }] : []}
													/>
												</Field>
											);
										}}
									</profileForm.Field>
								</FieldGroup>
							</FieldSet>

							<Field orientation="horizontal">
								<profileForm.Subscribe selector={(s) => s.isSubmitting}>
									{(isSubmitting) => (
										<Button type="submit" disabled={isSubmitting}>
											{isSubmitting ? "Saving…" : "Save changes"}
										</Button>
									)}
								</profileForm.Subscribe>
								<Button
									variant="outline"
									type="button"
									onClick={() => profileForm.reset()}
								>
									Reset
								</Button>
							</Field>
						</FieldGroup>
					</form>
				)}
			</div>
		</div>
	);
}
