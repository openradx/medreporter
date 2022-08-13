import { getSession } from "@blitzjs/auth"
import { GetServerSidePropsContext } from "next"

export const serverSideInitialPublicData = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx.req, ctx.res)

  return {
    initialPublicData: session.$publicData,
  }
}
