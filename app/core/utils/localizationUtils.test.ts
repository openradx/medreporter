import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import { getCountryCode, getDateLocale } from "./localizationUtils"

dayjs.extend(localizedFormat)

describe("getDateLocale", () => {
  it("should work", () => {
    const locale = getDateLocale("de")
    const time = dayjs(new Date(2022, 0, 1, 13, 59)).locale(locale).format("LT")
    expect(time).toBe("13:59")
  })
})

describe("getCountryCode", () => {
  it.each([
    ["en-US", "us"],
    ["en", "gb"],
    ["de", "de"],
    ["de-DE", "de"],
    ["se", "sv"],
  ])("should get the correct country code", (localeCode, countrycode) => {
    expect(getCountryCode(localeCode)).toBe(countrycode)
  })

  it("should throw with an invalid language code", () => {
    expect(() => getCountryCode("foobar")).toThrow()
  })
})
