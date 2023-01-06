import { TRPCError } from "@trpc/server"

export type PaginateArgs<QueryResult> = {
  skip?: number
  take?: number
  maxTake?: number
  count: () => Promise<number>
  query: (args: { skip: number; take: number }) => Promise<QueryResult>
}

const isInteger = (value: unknown) => typeof value === "number" && value % 1 === 0

export async function paginate<QueryResult>({
  skip = 0,
  take = 0,
  maxTake = 250,
  count: countQuery,
  query,
}: PaginateArgs<QueryResult>) {
  if (!isInteger(skip)) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "'skip' argument must be a integer" })
  }
  if (!isInteger(take)) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "'take' argument must be a integer" })
  }
  if (!isInteger(maxTake)) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "'maxTake' argument must be a integer" })
  }
  if (typeof countQuery !== "function") {
    throw new TRPCError({ code: "BAD_REQUEST", message: "'count' argument must be a function" })
  }
  if (typeof query !== "function") {
    throw new TRPCError({ code: "BAD_REQUEST", message: "'query' argument must be a function" })
  }
  if (skip < 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "'skip' argument must be a positive number",
    })
  }
  if (take < 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "'take' argument must be a positive number",
    })
  }
  if (take > maxTake) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `'take' argument must less than 'maxTake' which is currently ${maxTake}`,
    })
  }

  const [count, items] = await Promise.all([countQuery(), query({ skip, take })])

  const hasMore = skip + take < count
  const nextPage = hasMore ? { take, skip: skip + take } : null
  const pageCount = Math.floor((count + take - 1) / take)
  const from = skip + 1
  const to = skip + take

  return {
    items,
    nextPage,
    hasMore,
    pageCount,
    pageSize: take,
    from,
    to,
    count,
  }
}
