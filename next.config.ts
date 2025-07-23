import bundleAnalyzer from "@next/bundle-analyzer"
import type { NextConfig } from "next"
import routesConfig from "nextjs-routes/config"
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
  experimental: {
    swcPlugins: [
      [
        "@lingui/swc-plugin",
        {
          // Additional Configuration
        },
      ],
    ],
  },

  // Used for development server
  turbopack: {
    rules: {
      "*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
      "*.svg": {
        as: "*.js",
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: true,
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
      },
    },
  },
}

export default withBundleAnalyzer(withRoutes(nextConfig))
