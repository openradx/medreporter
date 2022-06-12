import i18n, { InitOptions } from "i18next"
import HttpBackend from "i18next-http-backend"
import BackendAdapter from "i18next-multiload-backend-adapter"
import { defaultConfig } from "./i18nDefaultConfig"

export const createClient = (type: "site" | "sr", config: InitOptions) => {
  const instance = i18n.createInstance()

  // TODO: fix types, see https://github.com/i18next/i18next-fs-backend/issues/20
  const backend = {
    backend: HttpBackend,
    backendOption: {
      loadPath: `/api/${type}-locales?lng={{lng}}&ns={{ns}}`,
    },
  } as any

  const initPromise = instance.use(BackendAdapter).init({
    ...defaultConfig,
    backend,
    ...config,
  })

  return { i18n: instance, initPromise }
}
