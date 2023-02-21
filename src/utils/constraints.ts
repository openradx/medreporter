import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { TRPCError } from "@trpc/server"

// For codes see https://www.prisma.io/docs/reference/api-reference/error-reference
export function checkUniqueConstraint<M extends Record<string, any>>(
  error: unknown,
  fields: keyof M | (keyof M)[]
): void {
  fields = Array.isArray(fields) ? fields : [fields]
  if (error instanceof PrismaClientKnownRequestError) {
    const target = error.meta?.target
    if (Array.isArray(target)) {
      for (const field of fields) {
        if (error.code === "P2002" && target.includes(field)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Unique constraint failed on field "${String(field)}"`,
          })
        }
      }
    }
  }
}
