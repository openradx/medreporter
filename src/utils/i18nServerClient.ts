import i18next, { InitOptions } from "i18next"
import Backend from "i18next-fs-backend"
import { LoadPathOption } from "i18next-http-backend"
import path from "path"
import { defaultConfig } from "./i18nDefaultConfig"

const loadPath: LoadPathOption = () => {
  const localesPath = path.join(process.cwd(), "src", "locales")
  return `${localesPath}/{{lng}}/{{ns}}.yml`
}

export const createClient = (config: InitOptions) => {
  const instance = i18next.createInstance()

  const initPromise = instance.use(Backend).init({
    ...defaultConfig,
    backend: { loadPath },
    ...config,
  })

  return { i18n: instance, initPromise }
}
