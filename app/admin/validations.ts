import { z } from "zod"
import { UserRole } from "../../db"
import { password, Signup } from "../auth/validations"

export const CreateInstitute = z.object({
  name: z.string().min(3).max(100),
})

export const UpdateInstitute = CreateInstitute.extend({
  id: z.number(),
})

export const CreateUser = Signup.extend({
  role: z.enum([UserRole.SUPERADMIN, UserRole.ORGANIZER, UserRole.USER]),
})

export const UpdateUser = Signup.extend({
  id: z.number(),
  password: password.or(z.literal("")).optional(),
  role: z.enum([UserRole.SUPERADMIN, UserRole.ORGANIZER, UserRole.USER]),
})
