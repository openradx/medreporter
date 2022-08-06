import { Ctx } from "blitz"

export default async function logout(_: any, ctx: Ctx) {
  const result = await ctx.session.$revoke()
  return result
}
