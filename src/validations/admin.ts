import { MembershipRole } from "@prisma/client"
import { z } from "zod"
import { PasswordSchema, SignupSchema } from "./auth"
import { PaginationSchema } from "./common"

export const CreateInstituteSchema = z.object({
  name: z.string().min(3).max(100),
})

export const CreateMembershipSchema = z.object({
  instituteId: z.string(),
  userId: z.string(),
  role: z.nativeEnum(MembershipRole),
})

export const DeleteInstituteSchema = z.object({
  id: z.string(),
})

export const DeleteMembershipSchema = z.object({
  id: z.string(),
})

export const GetInstitutesSchema = PaginationSchema.extend({
  filter: z.string().optional(),
})

export const GetMembershipsSchema = PaginationSchema.extend({
  instituteId: z.string(),
  role: z.nativeEnum(MembershipRole),
})

export const GetUsersSchema = PaginationSchema.extend({
  filter: z.string().optional(),
})

export const GetUsersForMembershipSchema = PaginationSchema.extend({
  instituteId: z.string(),
})

export const UpdateInstituteSchema = CreateInstituteSchema.extend({
  id: z.string(),
})

export const CreateUserSchema = SignupSchema.extend({
  role: z.nativeEnum(UserRole),
})

export const UpdateUserSchema = SignupSchema.extend({
  id: z.string(),
  password: PasswordSchema.or(z.literal("")).optional(),
  role: z.nativeEnum(UserRole),
})
