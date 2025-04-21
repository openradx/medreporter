import { Messages } from "@lingui/core"
import invariant from "tiny-invariant"

export const loadSiteTranslation = async (locale: string | undefined): Promise<Messages> => {
  invariant(locale, "Locale is required")
  const { messages } = await import(`~/locales/${locale}/messages`)
  return messages
}
