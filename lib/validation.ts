import * as z from 'zod'

export const registerStep1Schema = z.object({
	name: z.string().min(3),
	email: z.string().email(),
})

export const registerStep2Schema = z.object({
	username: z.string().min(3),
	password: z.string().min(6),
})

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
})

export const userSchema = z.object({
	name: z.string().min(3),
	username: z.string().min(3),
	bio: z.string().min(3),
	location: z.string().min(3),
})
