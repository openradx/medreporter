import { i18n } from "i18next"

export const setupI18nextHmr = async (i18nInstance: i18n) => {
  if (process.env.NODE_ENV !== "production") {
    if (typeof window !== "undefined") {
      const { applyClientHMR } = await import("i18next-hmr/client")
      applyClientHMR(i18nInstance)
    } else {
      // const { applyServerHMR } = await import("i18next-hmr/server")
      // applyServerHMR(i18nInstance)
    }
  }
}
