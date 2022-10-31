import { createModuleDraft } from "./moduleUtils"
import { parseModuleCode } from "./parserUtils"

describe("createModuleDraft", () => {
  it("creates a valid monolingual module draft", () => {
    const draft = createModuleDraft("foobar", false, "en")
    expect(draft.length).toBeGreaterThan(0)
    expect(() => parseModuleCode(draft)).not.toThrow()
  })

  it("creates a valid multilingual module draft", () => {
    const draft = createModuleDraft("foobar", true, "en")
    expect(draft.length).toBeGreaterThan(0)
    expect(() => parseModuleCode(draft)).not.toThrow()
  })
})
