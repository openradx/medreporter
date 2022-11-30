/*
 * Usage:
 * node -r @swc-node/register scripts/parseSVG.ts --output options public/images/arteriesBrain.svg
 * node -r @swc-node/register scripts/parseSVG.ts --output translations public/images/arteriesBrain.svg
 * or (by using scripts entry in package.json)
 * yarn svg:options ./public/images/arteriesBrain.svg
 * yarn svg:translations ./public/images/arteriesBrain.svg
 */
import { Option, program } from "commander"
import { readFileSync } from "fs"
import { dump } from "js-yaml"
import { parse, Node, ElementNode } from "svg-parser"

program
  .description("Parses a SVG file and extracts information.")
  .argument("<svg_file>")
  .addOption(
    new Option("-o, --output <format>", "Output format")
      .choices(["options", "translations"])
      .makeOptionMandatory()
  )
  .parse(process.argv)

const filepath = program.args[0]
const output = program.opts().output as "options" | "translations"

if (!filepath || !filepath.endsWith(".svg")) {
  // eslint-disable-next-line no-console
  console.error("You must provide a SVG filename!")
  process.exit()
}

const imageName = filepath.replace(/^.*[\\/]/, "").replace(/\.[^/.]+$/, "")

const svgString = readFileSync(filepath, "utf-8")
const root = parse(svgString)

const ids: string[] = []

const travel = (node: Node) => {
  if (node.type === "element") {
    const element = node as ElementNode
    if (element.properties && "id" in element.properties) {
      const id = element.properties.id as string
      if (id in ids) {
        throw new Error(`Image contains duplicate IDs: ${id}`)
      }
      ids.push(id)
      return
    }
    element.children.forEach((child) => {
      if (typeof child !== "string") {
        travel(child)
      }
    })
  }
}

travel(root.children[0])

if (output === "options") {
  const result = ids.map((id) => ({ value: id, label: `${imageName}.${id}` }))
  // eslint-disable-next-line no-console
  console.log(result)
}

if (output === "translations") {
  const result = dump({
    [imageName]: Object.fromEntries(ids.map((id) => [id, "_____"])),
  })
  // eslint-disable-next-line no-console
  console.log(result)
}
