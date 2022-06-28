/*
 * Usage:
 * node -r @swc-node/register scripts/parseSVG.ts public/images/arteriesBrain.svg
 * or (by using scripts entry in package.json)
 * yarn svg:extract_ids ./public/images/arteriesBrain.svg
 */
import { readFileSync } from "fs"
import { parse, Node, ElementNode } from "svg-parser"
import { stringify } from "yaml"

const filename = process.argv[2]

if (!filename) {
  // eslint-disable-next-line no-console
  console.error("You must provide a SVG filename!")
  process.exit()
}

const svgString = readFileSync(filename, "utf-8")
const root = parse(svgString)
const result: Record<string, string> = {}

const travel = (node: Node) => {
  if (node.type === "element") {
    const element = node as ElementNode
    if (element.properties && "id" in element.properties) {
      result[element.properties.id] = element.properties.id as string
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

// eslint-disable-next-line no-console
console.log(stringify(result))
