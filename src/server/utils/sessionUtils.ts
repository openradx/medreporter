import { GetServerSidePropsContext } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "~/pages/api/auth/[...nextauth]"

export const getServerSideSession = async (
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
) => await getServerSession(req, res, authOptions(req, res))
