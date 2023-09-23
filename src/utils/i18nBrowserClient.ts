import i18next, { InitOptions } from "i18next"
import HttpApi, { HttpBackendOptions } from "i18next-http-backend"
import BackendAdapter from "i18next-multiload-backend-adapter"
import { defaultConfig } from "./i18nDefaultConfig"

const backendOption: HttpBackendOptions = {
  loadPath: "/api/locales?lng={{lng}}&ns={{ns}}",
}

export const createClient = (config: Exclude<InitOptions, "backend">) => {
  const instance = i18next.createInstance()

  const backend = new BackendAdapter(null, {
    backend: HttpApi,
    backendOption,
  })

  const initPromise = instance.use(backend).init({
    ...defaultConfig,
    ...config,
  })

  return { i18n: instance, initPromise }
}
