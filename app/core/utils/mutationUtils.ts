import { PrismaClientKnownRequestError } from "@prisma/client/runtime"

type ErrorMeta = { target?: string[] }

// For codes see https://www.prisma.io/docs/reference/api-reference/error-reference
function isPrismaError(error: unknown, code: string, field: string) {
  if ("code" in (error as any) && "meta" in (error as any)) {
    const prismaError = error as PrismaClientKnownRequestError
    const inField = (prismaError.meta as ErrorMeta).target?.includes(field)
    if (code === "P2002" && inField) {
      return true
    }
  }
  return false
}

export function uniqueConstraintFailed(error: any, field: string) {
  return isPrismaError(error, "P2002", field)
}
