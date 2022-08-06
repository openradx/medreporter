import { z } from "zod"

export const username = z
  .string()
  .min(3)
  .max(25)
  .regex(/^[a-zA-Z0-9]+[a-zA-Z0-9_-]+[a-zA-Z0-9]+$/)
  .refine(
    (value) => {
      const reserved = ["new"]
      return !reserved.includes(value)
    },
    { message: "Reserved keyword" }
  )

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(8)
  .max(100)
  .transform((str) => str.trim())

export const Signup = z.object({
  username,
  email,
  password,
  fullName: z.string(),
  about: z.string(),
})

export const Login = z.object({
  usernameOrEmail: z.string().transform((str) => str.trim()),
  password: z.string(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
