import * as v from "valibot";

// Create registration schema with email and password
export const RegistrationSchema = v.object({
	name: v.pipe(
		v.string(),
		v.maxLength(20, "Your username is too long."),
		v.nonEmpty("Field must not be empty"),
	),
	email: v.pipe(
		v.string(),
		v.email("Must be a valid email"),
		v.nonEmpty("Field must not be empty"),
	),
	password: v.pipe(
		v.string(),
		v.minLength(8, "Password must be at least 8 characters long"),
		v.nonEmpty("Field must not be empty"),
		v.regex(
			/(?=.*?[A-Z]).*/,
			"Password must contain at least one upper case letter.",
		),
		v.regex(/\d/, "Password must contain at least one number."),
	),
});

export const LoginSchema = v.object({
	email: v.pipe(
		v.string(),
		v.email("Must be a valid email"),
		v.nonEmpty("Field must not be empty"),
	),
	password: v.pipe(
		v.string(),
		v.minLength(8, "Password must be at least 8 characters long"),
		v.nonEmpty("Field must not be empty"),
		v.regex(
			/(?=.*?[A-Z]).*/,
			"Password must contain at least one upper case letter.",
		),
		v.regex(/\d/, "Password must contain at least one number."),
	),
});

export const ProfileSchema = v.object({
	name: v.pipe(
		v.string(),
		v.minLength(2, "Full name must be at least 2 characters long."),
		v.maxLength(20, "Full name must be at most 50 characters long."),
		v.nonEmpty("Full name must not be empty."),
	),
});

export const EventSchema = v.object({
	eventName: v.pipe(
		v.string(),
		v.minLength(4, "Event name must be at least 4 characters long."),
		v.maxLength(256, "Event name must be at most 256 characters long."),
		v.nonEmpty("Event name must not be empty."),
	),
	location: v.pipe(
		v.string(),
		v.minLength(2, "Location must be at least 2 characters long."),
		v.maxLength(256, "Location must be at most 256 characters long."),
		v.nonEmpty("Location must not be empty."),
	),
	eventDate: v.pipe(v.date()),
	ticketCount: v.pipe(
		v.number(),
		v.integer(),
		v.minValue(1, "Ticket count must be at least 1."),
		v.maxValue(1000, "Ticket count must be at most 1000."),
	),
	minimumAge: v.optional(
		v.pipe(
			v.number(),
			v.integer(),
			v.minValue(0, "Minimum age cannot be negative."),
			v.maxValue(120, "Minimum age must be at most 120."),
		),
	),
});
