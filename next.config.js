const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer({
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
