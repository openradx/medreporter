import bundleAnalyzer from "@next/bundle-analyzer"
import type { NextConfig } from "next"
import routesConfig from "nextjs-routes/config"
import { Configuration } from "webpack"
import appConfig from "./app.config"
import env from "./src/server/env"

const withRoutes = routesConfig({ outDir: "types" })
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: appConfig.supportedSiteLanguages,
    defaultLocale: appConfig.defaultSiteLanguage,
    localeDetection: false,
  },
  env: {
    // make url available on the client
    NEXTAUTH_URL: env.NEXTAUTH_URL,
    CURRENT_YEAR: new Date().getFullYear().toString(),
  },
  webpack(config: Configuration) {
    // Import Markdown files as strings,
    // see https://webpack.js.org/guides/asset-modules/#source-assets
    config.module?.rules?.unshift({
      test: /\.md$/,
      type: "asset/source",
    })

    // Load SVG graphics with SVGR and configure SVGO (SVG optimizer) used by SVGR
    config.module?.rules?.push({
      test: /\.svg$/,
      resourceQuery: { not: /raw/ },
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      cleanupIds: false,
                      convertPathData: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    })

    return config
  },
}

export default withBundleAnalyzer(withRoutes(nextConfig))
