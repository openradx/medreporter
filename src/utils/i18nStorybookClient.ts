import i18next, { InitOptions } from "i18next"
import HttpApi from "i18next-http-backend"
import yaml from "js-yaml"
import { defaultConfig } from "./i18nDefaultConfig"

export const createClient = (config: InitOptions) => {
  const instance = i18next.createInstance()

  const initPromise = instance.use(HttpApi).init({
    ...defaultConfig,
    backend: {
      loadPath: "/{{lng}}/{{ns}}.yml",
      parse: (data: any) => yaml.load(data) as any,
    },
    ...config,
  })

  return { i18n: instance, initPromise }
}
