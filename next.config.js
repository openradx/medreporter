const { withBlitz } = require("@blitzjs/next")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/
const config = {
  reactStrictMode: true,
  i18n: {
    localeDetection: true,
    locales: ["de", "en-US"],
    defaultLocale: "en-US",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    if (config.mode === "development") {
      // Watch changes of locales to reload i18next resources on the client
      const { FileWatchHMRPlugin } = require("file-watch-hmr/plugin")
      const path = require("path")
      config.plugins.push(
        new FileWatchHMRPlugin({
          folders: [path.resolve(__dirname, "locales")],
        })
      )
    }

    // Load SVG graphics with SVGR
    config.module?.rules?.push({
      test: /\.svg$/,
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
                      cleanupIDs: false,
                      prefixIds: false,
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

module.exports = withBundleAnalyzer(withBlitz(config))
