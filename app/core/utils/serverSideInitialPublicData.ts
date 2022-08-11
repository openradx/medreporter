import { getSession } from "@blitzjs/auth"
import { GetServerSidePropsContext } from "next"

export const serverSideInitialPublicData = async (
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
) => {
  const session = await getSession(req, res)

  return {
    initialPublicData: session.$publicData,
  }
}
