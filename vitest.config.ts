import { loadEnvConfig } from "@next/env"
import tsconfigPaths from "vite-tsconfig-paths"
import { configDefaults, defineConfig } from "vitest/config"

const projectDir = process.cwd()
loadEnvConfig(projectDir)

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    exclude: [...configDefaults.exclude, "**/playwright/**"],
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
})
