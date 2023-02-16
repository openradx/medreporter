import { GetServerSidePropsContext } from "next"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "~/pages/api/auth/[...nextauth]"

export const getServerSideSession = async (
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
) => await unstable_getServerSession(req, res, authOptions(req, res))
