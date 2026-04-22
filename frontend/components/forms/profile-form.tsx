"use client";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { User } from "@/db/types";
import { updateProfile } from "@/lib/actions/profile";
import { ProfileSchema } from "@/lib/schema";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as v from "valibot";

export default function ProfileForm({ user }: { user: User }) {
	const profileForm = useForm({
		defaultValues: {
			name: user.name,
			age: user.age
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
		<form
			onSubmit={(e) => {
				e.preventDefault();
				profileForm.handleSubmit();
			}}
		>
			<FieldGroup>
				<FieldSet>
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
									<FieldLabel htmlFor="profile-name">Full Name</FieldLabel>
									<Input
										id="profile-name"
										placeholder="Your full name"
										autoComplete="name"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
									/>
									<FieldError errors={error ? [{ message: error }] : []} />
								</Field>
							);
						}}
					</profileForm.Field>
					<profileForm.Field name="age">
						{(field) => {
							const result = v.safeParse(
								ProfileSchema.entries.age,
								field.state.value,
							);
							const error =
								!result.success && field.state.meta.isDirty
									? result.issues[0].message
									: undefined;
							return (
								<Field>
									<FieldLabel htmlFor="profile-age">Age</FieldLabel>
									<Input
										id="profile-age"
										autoComplete="age"
										type="number"
										value={field.state.value}
										onChange={(e) => field.handleChange(parseInt(e.target.value))}
										onBlur={field.handleBlur}
									/>
									<FieldError errors={error ? [{ message: error }] : []} />
								</Field>
							);
						}}
					</profileForm.Field>
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
	);
}
