const path = require("path")
const { env } = require("./src/server/env")
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")
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
                entry: path.resolve(
                  "./node_modules/@medreporter/monaco-plugin-medtl/dist/medtl.worker.js"
                ),
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

module.exports = withBundleAnalyzer(withRoutes(nextConfig))
