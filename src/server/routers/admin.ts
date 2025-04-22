import { Institute, MembershipRole, Prisma, User, UserRole } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { hasRole } from "~/utils/authorization"
import { checkUniqueConstraint } from "~/utils/constraints"
import { hashPassword } from "~/utils/cryptography"
import { paginate } from "~/utils/pagination"
import {
  CreateInstituteSchema,
  CreateMembershipSchema,
  DeleteInstituteSchema,
  DeleteMembershipSchema,
  GetInstitutesSchema,
  GetMembershipsSchema,
  GetUsersForMembershipSchema,
  GetUsersSchema,
  UpdateInstituteSchema,
  UpdateUserSchema,
} from "~/validations/admin"
import { prisma } from "../prisma"
import { adminProcedure, authedProcedure, router, superuserProcedure } from "../trpc"

export const adminRouter = router({
  createInstitute: adminProcedure.input(CreateInstituteSchema).mutation(async ({ input, ctx }) => {
    const { name } = input

    try {
      return await prisma.institute.create({
        data: {
          name,
          memberships: {
            create: [
              {
                userId: user.id,
                role: MembershipRole.OWNER,
              },
            ],
          },
        },
      })
    } catch (error) {
      checkUniqueConstraint<Institute>(error, "name")
      throw error
    }
  }),
  createMembership: authedProcedure
    .input(CreateMembershipSchema)
    .mutation(async ({ input, ctx }) => {
      const { instituteId } = input
      const { user } = ctx

      // SUPERUSER can create any membership
      if (hasRole(user, UserRole.SUPERUSER)) {
        return await prisma.membership.create({ data: input })
      }

      // Check if current user is owner or admin of the institute
      const membership = await prisma.membership.findFirst({
        where: { userId: user.id, instituteId },
      })
      if (membership?.role === MembershipRole.OWNER || membership?.role === MembershipRole.ADMIN) {
        return await prisma.membership.create({ data: input })
      }

      throw new TRPCError({ code: "UNAUTHORIZED" })
    }),
  deleteInstitute: adminProcedure.input(DeleteInstituteSchema).mutation(async ({ input, ctx }) => {
    const { id: instituteId } = input
    const { user } = ctx

    // A SUPERUSER can delete any institute
    if (user.roles.includes(UserRole.SUPERUSER)) {
      return await prisma.institute.deleteMany({ where: { id: instituteId } })
    }

    // An ORGANIZER can only delete his own institutes
    const membership = await prisma.membership.findFirst({
      where: { userId: user.id, instituteId },
    })
    if (membership?.role === MembershipRole.OWNER) {
      return await prisma.institute.deleteMany({ where: { id: instituteId } })
    }

    // TODO: check that memberships are deleted on CASCADE

    throw new TRPCError({ code: "UNAUTHORIZED" })
  }),
  deleteMembership: authedProcedure
    .input(DeleteMembershipSchema)
    .mutation(async ({ input, ctx }) => {
      const { id: membershipId } = input
      const { user } = ctx

      // SUPERUSER can delete any membership
      if (hasRole(user, UserRole.SUPERUSER)) {
        return await prisma.membership.deleteMany({ where: { id: membershipId } })
      }

      // Only an owner or admin of the institute can delete memberships of this institute
      const membershipToDelete = await prisma.membership.findFirst({ where: { id: membershipId } })
      if (!membershipToDelete)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The membership to delete could not be found.",
        })

      const membershipOfUser = await prisma.membership.findFirst({
        where: {
          userId: user.id,
          instituteId: membershipToDelete.instituteId,
        },
      })
      if (
        membershipOfUser?.role === MembershipRole.OWNER ||
        membershipOfUser?.role === MembershipRole.ADMIN
      ) {
        return await prisma.membership.deleteMany({ where: { id: membershipId } })
      }

      throw new TRPCError({ code: "UNAUTHORIZED" })
    }),
  getInstitutes: authedProcedure.input(GetInstitutesSchema).query(async ({ input, ctx }) => {
    const { filter, skip, take } = input
    const { user } = ctx

    const where: Prisma.InstituteWhereInput = {
      name: filter ? { contains: filter, mode: "insensitive" } : {},
    }

    if (!hasRole(user, UserRole.SUPERUSER)) {
      where.memberships = {
        some: {
          userId: user.id,
          role: { in: [MembershipRole.OWNER, MembershipRole.ADMIN] },
        },
      }
    }
    const {
      items: institutes,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => prisma.institute.count({ where }),
      query: (paginateArgs) =>
        prisma.institute.findMany({ ...paginateArgs, where, orderBy: { name: "asc" } }),
    })

    return {
      institutes,
      nextPage,
      hasMore,
      count,
    }
  }),
  getMemberships: authedProcedure.input(GetMembershipsSchema).query(async ({ input, ctx }) => {
    const { instituteId, role, skip, take } = input
    const { user } = ctx

    // Check that current user is a SUPERUSER or OWNER / ADMIN of that institute
    if (!hasRole(user, UserRole.SUPERUSER)) {
      const membership = await prisma.membership.findFirst({
        where: {
          instituteId,
          userId: user.id,
          role: { in: [MembershipRole.OWNER, MembershipRole.ADMIN] },
        },
      })
      if (!membership) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
      }
    }

    const where: Prisma.MembershipWhereInput = {
      instituteId,
      role,
    }

    const {
      items: memberships,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => prisma.membership.count({ where }),
      query: (paginateArgs) =>
        prisma.membership.findMany({
          ...paginateArgs,
          where,
          orderBy: { user: { username: "asc" } },
          include: { user: true },
        }),
    })

    return {
      memberships,
      nextPage,
      hasMore,
      count,
    }
  }),
  getUsers: superuserProcedure.input(GetUsersSchema).query(async ({ input }) => {
    const { filter, skip, take } = input

    const where: Prisma.UserWhereInput = filter
      ? {
          OR: [
            { email: { contains: filter, mode: "insensitive" } },
            { username: { contains: filter, mode: "insensitive" } },
          ],
        }
      : {}

    const {
      items: users,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => prisma.user.count({ where }),
      query: (paginateArgs) =>
        prisma.user.findMany({ ...paginateArgs, where, orderBy: { username: "asc" } }),
    })

    return {
      users,
      nextPage,
      hasMore,
      count,
    }
  }),
  getUsersForMembership: authedProcedure
    .input(GetUsersForMembershipSchema)
    .query(async ({ input, ctx }) => {
      const { instituteId, skip, take } = input
      const { user } = ctx

      // Check that current user is a SUPERUSER or OWNER / ADMIN of that institute
      if (!hasRole(user, [UserRole.SUPERUSER])) {
        const membership = await prisma.membership.findFirst({
          where: {
            instituteId,
            userId: user.id,
            role: { in: [MembershipRole.OWNER, MembershipRole.ADMIN] },
          },
        })
        if (!membership) {
          throw new TRPCError({ code: "UNAUTHORIZED" })
        }
      }

      const where: Prisma.UserWhereInput = {
        memberships: { none: { instituteId } },
      }

      const {
        items: users,
        hasMore,
        nextPage,
        count,
      } = await paginate({
        skip,
        take,
        count: () => prisma.user.count({ where }),
        query: (paginateArgs) =>
          prisma.user.findMany({ ...paginateArgs, where, orderBy: { username: "asc" } }),
      })

      return {
        users,
        nextPage,
        hasMore,
        count,
      }
    }),
  updateInstitute: adminProcedure.input(UpdateInstituteSchema).mutation(async ({ input, ctx }) => {
    const { id: instituteId, ...data } = input
    const { user } = ctx

    // A SUPERUSER can update any institute
    if (hasRole(user, UserRole.SUPERUSER)) {
      return await prisma.institute.update({ where: { id: instituteId }, data })
    }

    // An ORGANIZER can only update his own institutes
    const membership = await prisma.membership.findFirst({
      where: { userId: user.id, instituteId },
    })
    if (membership?.role === MembershipRole.OWNER) {
      return await prisma.institute.update({ where: { id: instituteId }, data })
    }

    throw new TRPCError({ code: "UNAUTHORIZED" })
  }),
  updateUser: superuserProcedure.input(UpdateUserSchema).mutation(async ({ input }) => {
    const { id: userId, username, email, password, fullName, about, role } = input

    const data: Partial<User> = {
      username: username.trim(),
      email: email.toLowerCase().trim(),
      fullName: fullName.trim(),
      about: about.trim(),
      role,
    }

    if (password) {
      data.hashedPassword = await hashPassword(password)
    }

    try {
      return await prisma.user.update({
        where: { id: userId },
        data,
      })
    } catch (error) {
      checkUniqueConstraint<User>(error, ["username", "email"])
      throw error
    }
  }),
})
