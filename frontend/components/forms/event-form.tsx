"use client";

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
import { createEvent } from "@/lib/actions/events";
import { EventSchema } from "@/lib/schema";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

export function EventForm() {
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
			
			window.location.replace("/");
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
											type="text"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.Field
							name="location"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Location</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											type="text"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.Field
							name="ticketCount"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Ticket count</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) =>
												field.handleChange(e.target.valueAsNumber)
											}
											aria-invalid={isInvalid}
											type="number"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.Field
							name="eventDate"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Event date</FieldLabel>
										{/*<Input
											id={field.name}
											name={field.name}
											value={field.state.value.toDateString()}
											//value={field.state.value.toISOString().substring(0, 10)}
											onBlur={field.handleBlur}
											onChange={(e) =>
												field.handleChange(new Date(e.target.value))
											}
											aria-invalid={isInvalid}
											type="date"
										/>*/}
										<Popover>
											<PopoverTrigger>
												<Button
													variant={"outline"}
													id={field.name}
													name={field.name}
													onBlur={field.handleBlur}
													aria-invalid={isInvalid}
													data-empty={!field.state.value}
													className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
												>
													{field.state.value ? (
														new Date(field.state.value).toISOString()
													) : (
														<span>Pick a date</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.state.value}
													onSelect={(e) => field.handleChange(e ?? new Date())}
													defaultMonth={field.state.value}
												/>
											</PopoverContent>
										</Popover>
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
				<Button type="submit" form="bug-report-form">Create event</Button>
			</CardFooter>
		</Card>
	);
}
