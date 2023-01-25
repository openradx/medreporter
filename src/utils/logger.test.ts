import { beforeEach, describe, expect, it } from "vitest"
import { logger } from "./logger"

logger.consoleEnabled = false

describe("Logger", () => {
  beforeEach(() => {
    logger.clear()
  })

  it("stores log messages correctly", () => {
    logger.info("foo")
    logger.error("bar")

    expect(logger.log.length).toBe(2)
    expect(logger.log[0].level).toBe("info")
    expect(logger.log[0].message).toBe("foo")
    expect(logger.log[1].level).toBe("error")
    expect(logger.log[1].message).toBe("bar")
  })

  it("uses a fixed length for the log queue", () => {
    for (let i = 0; i < logger.logSize; i++) {
      logger.info("foo")
    }
    expect(logger.log.length).toBe(logger.logSize)

    logger.error("bar")
    expect(logger.log.length).toBe(logger.logSize)
    expect(logger.log[logger.log.length - 1].level).toBe("error")
    expect(logger.log[logger.log.length - 1].message).toBe("bar")
  })
})
