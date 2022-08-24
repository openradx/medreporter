const path = require("path")
const { withBlitz } = require("@blitzjs/next")
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")

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
  webpack(config, options) {
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

    // Allows to load CSS in monaco-editor as Next.js does not handle CSS in
    // node modules folder.
    // Workaround until RFC is through: https://github.com/vercel/next.js/discussions/27953
    config.module?.rules
      .find((rule) => rule.oneOf)
      .oneOf.forEach((rule) => {
        if (rule.issuer?.and?.[0]?.toString().includes("_app")) {
          const and = rule.issuer.and
          rule.issuer.or = [/[\\/]node_modules[\\/]monaco-editor[\\/]/, { and }]
          delete rule.issuer.and
        }
      })

    if (!options.isServer) {
      config.plugins?.push(
        new MonacoWebpackPlugin({
          languages: [],
          filename: "static/[name].js",
          customLanguages: [
            {
              label: "medtl",
              entry: undefined,
              worker: {
                id: "vs/language/medtl/medtlWorker",
                entry: path.resolve("./node_modules/@medtl/monaco-plugin/dist/medtl.worker.js"),
              },
            },
          ],
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
