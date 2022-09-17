import { z } from "zod"
import { MembershipRole, UserRole } from "db"
import { Pagination } from "app/core/validations"
import { password, Signup } from "../auth/validations"

export const CreateInstitute = z.object({
  name: z.string().min(3).max(100),
})

export const CreateMembership = z.object({
  instituteId: z.number(),
  userId: z.number(),
  role: z.enum([MembershipRole.MEMBER, MembershipRole.ADMIN, MembershipRole.OWNER]),
})

export const DeleteInstitute = z.object({
  id: z.number(),
})

export const DeleteMembership = z.object({
  id: z.number(),
})

export const DeleteUser = z.object({
  id: z.number(),
})

export const GetCategories = Pagination.extend({
  language: z.string(),
  filter: z.string().optional(),
  usedByModule: z.boolean().default(false),
  usedByTemplate: z.boolean().default(false),
})

export const GetInstitutes = Pagination.extend({
  filter: z.string().optional(),
})

export const GetMemberships = Pagination.extend({
  instituteId: z.number(),
  role: z.enum([MembershipRole.OWNER, MembershipRole.ADMIN, MembershipRole.MEMBER]),
})

export const GetTranslatedModules = Pagination.extend({
  language: z.string(),
  filter: z.string().optional(),
})

export const GetUsers = Pagination.extend({
  filter: z.string().optional(),
})

export const GetUsersForMembership = Pagination.extend({
  instituteId: z.number(),
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
