import z, { email } from "zod"

const PatientRegistrationZodSchema = z.object({
	name: z.string().min(3,"Name must be at least 3 characters long").max(10),
	email: z.email("Enter a valid email"),
	password: z.string().min(8,"Password must be at least 8 characters")
	.min(8,"Password must be at least 8 characters")
	.regex(/[A-Z]/, "Password must contain one Uppercase Letter")
	.regex(/[a-z]/, "Password must contain one Lowercase Letter")
	.regex(/[0-9]/, "Password must contain one number")
	.regex(/[^A-Za-z0-9]/, "Password must contain one special character"),
	patient: z.object( {
		contactNumber: z.string().optional()
	}).optional()
})

const LoginUserZodSchema = z.object({
	email: z.email("Enter a valid email"),
	password: z.string().min(8,"Password must be at least 8 characters").min(8,"Password must be at least 8 characters")
	.regex(/[A-Z]/, "Password must contain one Uppercase Letter")
	.regex(/[a-z]/, "Password must contain one Lowercase Letter")
	.regex(/[0-9]/, "Password must contain one number")
	.regex(/[^A-Za-z0-9]/, "Password must contain one special character") 
})


export const UserValidation = {
    PatientRegistrationZodSchema,
	LoginUserZodSchema
}