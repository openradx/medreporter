import i18next, { InitOptions } from "i18next"
import Backend from "i18next-fs-backend"
import path from "path"
import { defaultConfig } from "./i18nDefaultConfig"

export const createClient = (config: InitOptions) => {
  const instance = i18next.createInstance()

  const initPromise = instance.use(Backend).init({
    ...defaultConfig,
    backend: { loadPath: path.join(process.cwd(), "locales/{{lng}}/{{ns}}.yml") },
    ...config,
  })

  return { i18n: instance, initPromise }
}
