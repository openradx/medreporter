import { setupI18n } from "@lingui/core"
import { I18nProvider } from "@lingui/react"
import { ReactNode, useState } from "react"
import { messages } from "~/locales/en/messages"

interface SiteTranslationsProps {
  children: ReactNode
}

export const SiteTranslations = ({ children }: SiteTranslationsProps) => {
  const [i18n] = useState(() => {
    const i18n = setupI18n({ locale: "en", messages: { en: messages } })
    return i18n
  })
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}
