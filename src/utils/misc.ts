export const isServer = typeof window === "undefined"

export const isClient = typeof window !== "undefined"

export function unique<T>(items: T[]): T[] {
  return [...new Set(items)]
}
