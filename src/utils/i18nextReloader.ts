import { applyClientHMR } from "file-watch-hmr"
import { i18n } from "i18next"

const instances: Record<string, i18n> = {}

const isDevelopment = process.env.NODE_ENV === "development"
const isClient = typeof window !== "undefined"

// if (isDevelopment && isClient) {
//   applyClientHMR(async (changedFile) => {
//     const segments = changedFile.split("/")
//     const lng = segments[segments.length - 2]
//     const ns = segments[segments.length - 1].replace(/\.[^/.]+$/, "")

//     for (const instance of Object.values(instances)) {
//       instance.reloadResources(lng, ns).then(() => {
//         if (lng === instance.language) {
//           instance.changeLanguage(lng)
//         }
//       })
//     }
//   })
// }

export const registerInstance = (key: string, instance: i18n) => {
  instances[key] = instance
}
