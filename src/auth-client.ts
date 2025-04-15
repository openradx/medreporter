import {
  adminClient,
  customSessionClient,
  inferAdditionalFields,
  usernameClient,
} from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import type { auth } from "~/server/auth"

export const authClient = createAuthClient({
  plugins: [
    adminClient(),
    usernameClient(),
    customSessionClient<typeof auth>(),
    inferAdditionalFields<typeof auth>(),
  ],
})
