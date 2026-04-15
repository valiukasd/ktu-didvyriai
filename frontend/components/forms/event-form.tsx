"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { EventSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { createEvent } from "@/lib/actions/events";
import { toast } from "sonner";

export function EventForm() {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			eventName: "",
			location: "",
			ticketCount: 10,
			eventDate: new Date(),
		},
		validators: {
			onSubmit: EventSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				await createEvent(value);
			} catch (err) {
				console.error(err);

				toast("An unknown error ocurred! Try again later.");
			}
		},
	});

	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle>Create an event</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.Field
							name="eventName"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Event name</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											autoComplete="email"
											type="text"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter>
				<Button type="submit">Create event</Button>
			</CardFooter>
		</Card>
	);
}
