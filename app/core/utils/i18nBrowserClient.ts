import i18next, { InitOptions } from "i18next"
import HttpApi from "i18next-http-backend"
import { defaultConfig } from "./i18nDefaultConfig"

export const createClient = (config: InitOptions) => {
  const instance = i18next.createInstance()

  const initPromise = instance.use(HttpApi).init({
    ...defaultConfig,
    backend: {
      allowMultiLoading: true,
      loadPath: "/api/locales?lng={{lng}}&ns={{ns}}",
    },
    ...config,
  })

  return { i18n: instance, initPromise }
}
