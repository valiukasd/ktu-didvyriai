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
import { updateProfile } from "@/lib/actions/profile";
import { ProfileSchema } from "@/lib/schema";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as v from "valibot";

export default function ProfileForm() {
	const router = useRouter();

	const profileForm = useForm({
		defaultValues: {
			name: "",

		},

		validators: {
			onSubmit: ProfileSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				await updateProfile(value);
				toast.success("Profile updated successfully.");
			} catch {
				toast.error("Something went wrong. Please try again.");
			}
		},
	});

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
			<div className="flex w-full max-w-lg flex-col gap-10 px-4 py-12">
				(
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
				)
			</div>
		</div>
	);
}
