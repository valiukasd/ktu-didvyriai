import * as v from "valibot"

// Create registration schema with email and password
export const RegistrationSchema = v.object({
  name: v.pipe(v.string(), v.maxLength(20, 'Your username is too long.'), v.nonEmpty("Field must not be empty")),
  email: v.pipe(v.string(), v.email('Must be a valid email'), v.nonEmpty("Field must not be empty")),
  password: v.pipe(v.string(), v.minLength(8, 'Password must be at least 8 characters long'),
   v.nonEmpty("Field must not be empty"),
   v.check(
    (input) => {
        return input !== input.toLowerCase()
    },
    'Password must contain at least one upper case letter.'),
    v.check(
    (input) => {
        return input.match("\d") !== null
    },
    'Password must contain at least one number.'))
});