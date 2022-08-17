import { applyClientHMR } from "file-watch-hmr"
import { i18n } from "i18next"

const instances: i18n[] = []

const isDevelopment = process.env.NODE_ENV === "development"
const isClient = typeof window !== "undefined"

if (isDevelopment && isClient) {
  applyClientHMR(async (changedFile) => {
    const segments = changedFile.split("/")
    const lng = segments[segments.length - 2]
    const ns = segments[segments.length - 1].replace(/\.[^/.]+$/, "")

    for (const instance of instances) {
      instance.reloadResources(lng, ns).then(() => {
        if (lng === instance.language) {
          instance.changeLanguage(lng)
        }
      })
    }
  })
}

export const registerInstance = (instance: i18n) => {
  if (!instances.includes(instance)) {
    instances.push(instance)
  }
}
