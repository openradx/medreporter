const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  modulePaths: ["<rootDir>"],
  testEnvironment: "jest-environment-jsdom",
  testTimeout: 10000,
}

module.exports = createJestConfig(customJestConfig)
