import i18next, { InitOptions } from "i18next"
import Backend from "i18next-fs-backend"
import path from "path"
import { defaultConfig } from "./i18nDefaultConfig"

export const createClient = (config: Exclude<InitOptions, "backend">) => {
  const instance = i18next.createInstance()

  const backend = new Backend(null, {
    loadPath: path.join(process.cwd(), "locales/{{lng}}/{{ns}}.yml"),
  })

  const initPromise = instance.use(backend).init({
    ...defaultConfig,
    ...config,
  })

  return { i18n: instance, initPromise }
}
