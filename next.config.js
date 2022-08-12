const path = require("path")
const glob = require("glob")
const { withBlitz } = require("@blitzjs/next")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const localesDirs = [
  path.resolve(__dirname, "app/core/locales"),
  ...glob.sync("app/tools/*/locales").map((dir) => path.resolve(__dirname, dir)),
]

module.exports = withBundleAnalyzer(
  withBlitz({
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
      // Setup i18next-hmr
      if (config.mode === "development") {
        const { I18NextHMRPlugin } = require("i18next-hmr/plugin")
        config.plugins.push(new I18NextHMRPlugin({ localesDirs }))
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
  })
)
