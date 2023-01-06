import { describe, expect, it } from "vitest"
import { createFilterObject } from "./filterObject"

describe("createFilterObject", () => {
  it("works with one scoped filter", () => {
    expect(createFilterObject("tag:foo", ["tag"])).toEqual({
      tag: ["foo"],
    })
  })

  it("works with multiple scoped filters", () => {
    expect(createFilterObject("title:foo tag:bar", ["title", "description", "tag"])).toEqual({
      title: ["foo"],
      description: [],
      tag: ["bar"],
    })
  })

  it("works with unscoped filters", () => {
    expect(createFilterObject("foo bar", ["title", "tag"])).toEqual({
      title: ["foo", "bar"],
      tag: ["foo", "bar"],
    })
  })

  it("works with mixed scoped and unscoped filters", () => {
    expect(createFilterObject("tag:foo bar", ["title", "tag"])).toEqual({
      title: ["bar"],
      tag: ["foo", "bar"],
    })
  })

  it.each(["tag:'foo bar'", 'tag:"foo bar"'])("works with quoted scoped filters", (filter) => {
    expect(createFilterObject(filter, ["title", "tag"])).toEqual({
      title: [],
      tag: ["foo bar"],
    })
  })

  it.each(["'foo bar'", '"foo bar"'])("works with quoted unscoped filters", (filter) => {
    expect(createFilterObject(filter, ["title", "tag"])).toEqual({
      title: ["foo bar"],
      tag: ["foo bar"],
    })
  })
})
