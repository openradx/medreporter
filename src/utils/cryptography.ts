import bcrypt from "bcrypt"

export async function hashPassword(rawPassword: string) {
  return await bcrypt.hash(rawPassword, 10)
}

export async function comparePassword(rawPassword: string, hashedPassword: string) {
  bcrypt.compareSync(rawPassword, hashedPassword)
}

/**
 * Web compatible method to create a random string of a given length
 * From https://github.com/nextauthjs/next-auth/blob/45f423ed5d9349ee1b8c5574ff6153053d894361/packages/core/src/lib/web.ts#LL115C6-L115C6
 */
export function randomString(size: number) {
  const i2hex = (i: number) => `0${i.toString(16)}`.slice(-2)
  const r = (a: string, i: number): string => a + i2hex(i)
  const bytes = crypto.getRandomValues(new Uint8Array(size))
  return Array.from(bytes).reduce(r, "")
}

/**
 * Web compatible method to create a hash, using SHA256
 * From https://github.com/nextauthjs/next-auth/blob/45f423ed5d9349ee1b8c5574ff6153053d894361/packages/core/src/lib/web.ts#L105
 */
export async function createHash(message: string) {
  const data = new TextEncoder().encode(message)
  const hash = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toString()
}

// Adapted from https://github.com/nextauthjs/next-auth/blob/45f423ed5d9349ee1b8c5574ff6153053d894361/packages/core/src/lib/email/signin.ts#L38
export function createHashedToken() {
  const token = randomString(32)
  return createHash(token)
}
