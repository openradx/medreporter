import { z } from "zod"

export const UsernameSchema = z
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

export const EmailSchema = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const PasswordSchema = z
  .string()
  .min(8)
  .max(100)
  .transform((str) => str.trim())

export const SignupSchema = z.object({
  username: UsernameSchema,
  email: EmailSchema,
  password: PasswordSchema,
  fullName: z.string(),
  about: z.string(),
})

export const LoginSchema = z.object({
  usernameOrEmail: z.string().transform((str) => str.trim()),
  password: z.string(),
})

export const ForgotPasswordSchema = z.object({
  email: EmailSchema,
})

export const ResetPasswordSchema = z
  .object({
    email: EmailSchema,
    password: PasswordSchema,
    passwordConfirmation: PasswordSchema,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: PasswordSchema,
})
