import i18n, { InitOptions } from "i18next"
import Backend from "i18next-fs-backend"
import path from "path"
import { defaultConfig } from "./i18nDefaultConfig"

function loadPath() {
  const localesPath = path.join(process.cwd(), "src", "locales")
  return `${localesPath}/{{lng}}/{{ns}}.yml`
}

export const createClient = (config: InitOptions) => {
  const instance = i18n.createInstance()

  const initPromise = instance.use(Backend).init({
    ...defaultConfig,
    backend: { loadPath },
    ...config,
  })

  return { i18n: instance, initPromise }
}
