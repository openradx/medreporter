import { AuthServerPlugin, PrismaStorage, simpleRolesIsAuthorized } from "@blitzjs/auth"
import { setupBlitzServer } from "@blitzjs/next"
import { db } from "db"

const { gSSP, gSP, api } = setupBlitzServer({
  plugins: [
    AuthServerPlugin({
      cookiePrefix: "blitz-app-prefix",
      storage: PrismaStorage(db),
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
})

export { gSSP, gSP, api }
