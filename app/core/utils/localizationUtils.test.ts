import { getCountryCode } from "./localizationUtils"

describe("getCountryCode", () => {
  it.each([
    ["en-US", "us"],
    ["en", "gb"],
    ["de", "de"],
    ["de-DE", "de"],
  ])("should get the correct country code", (localeCode, countrycode) => {
    expect(getCountryCode(localeCode)).toBe(countrycode)
  })

  it("should throw with an invalid language code", () => {
    expect(() => getCountryCode("foobar")).toThrow()
  })
})
