const path = require("path")
const { env } = require("./src/server/env")
const withRoutes = require("nextjs-routes/config")({ outDir: "types" })
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    localeDetection: true,
    locales: ["de", "en"],
    defaultLocale: "en",
  },
  env: {
    // make url available on the client
    NEXTAUTH_URL: env.NEXTAUTH_URL,
  },
  webpack(config, options) {
    // Watch changes of locales to reload i18next resources on the client
    if (config.mode === "development") {
      const { FileWatchHMRPlugin } = require("file-watch-hmr/plugin")
      config.plugins.push(
        new FileWatchHMRPlugin({
          folders: [path.resolve(__dirname, "locales")],
        })
      )
    }

    // Import Markdown files as strings,
    // see https://webpack.js.org/guides/asset-modules/#source-assets
    config.module?.rules.unshift({
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

module.exports = withBundleAnalyzer(withRoutes(nextConfig))
