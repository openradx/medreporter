import { defineConfig } from "@lingui/cli"
import appConfig from "./app.config"

export default defineConfig({
  sourceLocale: appConfig.defaultSiteLanguage,
  locales: appConfig.supportedSiteLanguages,
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
})
