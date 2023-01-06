import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import { describe, expect, it } from "vitest"
import { getDateLocale } from "./localizationUtils"

dayjs.extend(localizedFormat)

describe("getDateLocale", () => {
  it("should work", () => {
    const locale = getDateLocale("de")
    const time = dayjs(new Date(2022, 0, 1, 13, 59)).locale(locale).format("LT")
    expect(time).toBe("13:59")
  })
})
