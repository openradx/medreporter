import { AuthServerPlugin, PrismaStorage, simpleRolesIsAuthorized } from "@blitzjs/auth"
import { setupBlitzServer } from "@blitzjs/next"
import { BlitzLogger } from "blitz"
import db from "../db"
import { authConfig } from "./blitz-client"

export const { gSSP, gSP, api } = setupBlitzServer({
  plugins: [
    AuthServerPlugin({
      ...authConfig,
      storage: PrismaStorage(db),
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  logger: BlitzLogger({}),
})
