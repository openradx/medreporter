/**
 * This module is also included in `/next.config.ts`.
 */
import { z } from "zod"

/*eslint sort-keys: "error"*/
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
})

const env = envSchema.safeParse(process.env)

if (!env.success) {
  // eslint-disable-next-line no-console
  console.error("❌ Invalid environment variables:", JSON.stringify(env.error.format(), null, 4))
  process.exit(1)
}

export default env.data
