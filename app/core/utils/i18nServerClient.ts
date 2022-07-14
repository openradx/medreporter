import glob from "glob"
import i18next, { InitOptions } from "i18next"
import Backend from "i18next-fs-backend"
import path from "path"
import { defaultConfig } from "./i18nDefaultConfig"

type Namespaces = {
  core: string[]
  tools: string[]
}

const allNamespaces: string[] = []
let namespacesByFeature: Namespaces | null = null

const loadNamespaces = (pattern: string): string[] => {
  const namespaces = glob.sync(pattern).map((folder) => path.basename(folder))

  for (const namespace of namespaces) {
    if (allNamespaces.includes(namespace)) {
      throw new Error(`Duplicate locales namespace: ${namespace}`)
    }
    allNamespaces.push(namespace)
  }

  return namespaces
}

const fetchNamespaces = (): Namespaces => {
  if (namespacesByFeature !== null) {
    return namespacesByFeature
  }

  namespacesByFeature = {
    core: loadNamespaces("app/core/locales/*"),
    tools: loadNamespaces("app/tools/*"),
  }

  return namespacesByFeature
}

const loadPath = (lng: string, ns: string) => {
  const namespaces = fetchNamespaces()

  if (namespaces.core.includes(ns)) {
    const localesPath = path.join(process.cwd(), "app", "core", "locales")
    return `${localesPath}/{{ns}}/{{lng}}.yml`
  }

  if (namespaces.tools.includes(ns)) {
    const localesPath = path.join(process.cwd(), "app", "tools")
    return `${localesPath}/{{ns}}/locales/{{lng}}.yml`
  }

  throw new Error(`Invalid locales namespace: ${ns}`)
}

export const createClient = (config: InitOptions) => {
  const instance = i18next.createInstance()

  const initPromise = instance.use(Backend).init({
    ...defaultConfig,
    // TODO: any type is necessary because of https://github.com/i18next/i18next-fs-backend/issues/20
    backend: { loadPath: loadPath as any },
    ...config,
  })

  return { i18n: instance, initPromise }
}
