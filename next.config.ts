import bundleAnalyzer from "@next/bundle-analyzer"
import type { NextConfig } from "next"
import routesConfig from "nextjs-routes/config"
import path from "path"
import { Configuration } from "webpack"
import env from "./src/server/env"

const withRoutes = routesConfig({ outDir: "types" })
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["de", "en"],
    defaultLocale: "en",
    localeDetection: false,
  },
  env: {
    // make url available on the client
    NEXTAUTH_URL: env.NEXTAUTH_URL,
  },
  webpack(config: Configuration) {
    // Watch changes of locales to reload i18next resources on the client
    if (config.mode === "development") {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { FileWatchHMRPlugin } = require("file-watch-hmr/plugin")
      config.plugins?.push(
        new FileWatchHMRPlugin({
          folders: [path.resolve(__dirname, "locales")],
        })
      )
    }

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
