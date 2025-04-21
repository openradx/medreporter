import xmlPlugin from "@prettier/plugin-xml"
import babelPlugin from "prettier/plugins/babel"
import estreePlugin from "prettier/plugins/estree"
import markdownPlugin from "prettier/plugins/markdown"
import { formatWithCursor } from "prettier/standalone"
import { CodeType } from "~/types/general"

async function formatScript(code: string, cursorOffset: number): Promise<[string, number]> {
  const result = await formatWithCursor(code, {
    parser: "babel",
    cursorOffset,
    plugins: [babelPlugin, estreePlugin],
    semi: false,
    printWidth: 100,
  })
  return [result.formatted, result.cursorOffset]
}

async function formatJSON(code: string, cursorOffset: number): Promise<[string, number]> {
  const result = await formatWithCursor(code, {
    parser: "json",
    cursorOffset,
    plugins: [babelPlugin, estreePlugin],
  })
  return [result.formatted, result.cursorOffset]
}

async function formatMarkdown(code: string, cursorOffset: number): Promise<[string, number]> {
  const result = await formatWithCursor(code, {
    parser: "markdown",
    cursorOffset,
    plugins: [markdownPlugin],
  })
  return [result.formatted, result.cursorOffset]
}

async function formatSVG(code: string, cursorOffset: number): Promise<[string, number]> {
  const result = await formatWithCursor(code, {
    parser: "xml",
    cursorOffset,
    plugins: [xmlPlugin],
  })
  return [result.formatted, result.cursorOffset]
}

export async function formatCode(
  codeType: CodeType,
  code: string,
  cursorOffset: number
): Promise<[string, number]> {
  switch (codeType) {
    case "script":
      return formatScript(code, cursorOffset)
    case "json":
      return formatJSON(code, cursorOffset)
    case "markdown":
      return formatMarkdown(code, cursorOffset)
    case "svg":
      return formatSVG(code, cursorOffset)
    case "text":
      return [code, cursorOffset]
    default:
      throw new Error(`Unknown code type: ${codeType}`)
  }
}
