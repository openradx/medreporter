/* eslint-disable no-console */
import chalk from "chalk"
import { program } from "commander"
import fs from "fs"
import { dump } from "js-yaml"
import jsdom from "jsdom"

program
  .description("Parses a SVG file and extracts information.")
  .argument("<svg_file>")
  .parse(process.argv)

const imageFile = program.args[0]
if (!imageFile || !imageFile.endsWith(".svg")) {
  console.error(chalk.red("You must provide a SVG filename!"))
  process.exit()
}

const dom = new jsdom.JSDOM("")
const { DOMParser } = dom.window
const parser = new DOMParser()
const document = parser.parseFromString(fs.readFileSync(imageFile).toString(), "text/xml")

// only respect the first found in a subtree
const ids: string[] = []
const findIds = (el: Element) => {
  const id = el.getAttribute("id")
  if (id) {
    if (ids.includes(id)) {
      throw new Error(`Image contains duplicate IDs: ${id}`)
    }
    ids.push(id)
  } else {
    Array.from(el.children).forEach((child) => {
      findIds(child)
    })
  }
}
findIds(document.documentElement)

const result = dump(Object.fromEntries(ids.map((id) => [id, "_____"])))
console.log(result)
