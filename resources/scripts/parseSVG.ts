import { readFileSync } from "fs"
import { parse, Node, ElementNode } from "svg-parser"
import { stringify } from "yaml"

const filename = process.argv[2]

if (!filename) {
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
    for (const child of element.children) {
      if (typeof child !== "string") {
        travel(child)
      }
    }
  }
}

travel(root.children[0])
console.log(stringify(result))

//yarn ts-node scripts/parseSVG.ts app/core/images/anatomy/
