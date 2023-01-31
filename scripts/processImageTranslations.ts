/* eslint-disable no-console */
import chalk from "chalk"
import fs from "fs"
import glob from "glob"
import yaml from "js-yaml"
import jsdom from "jsdom"
import path from "path"

type Translations = { [lng in "de" | "en"]: { [key: string]: string } }

const projectDir = process.cwd()

const imageFiles = glob.sync("**/*.svg", {
  cwd: path.join(projectDir, "resources", "images"),
  absolute: true,
})

for (const imageFile of imageFiles) {
  const imageFilename = path.basename(imageFile)

  /* Load translations */
  const translationsFile = imageFile.replace(".svg", ".yml")
  const translationsFilename = path.basename(translationsFile)
  const translationsFileExists = fs.existsSync(translationsFile)
  if (!translationsFileExists) {
    console.error(chalk.red(`Missing translation file of "${imageFilename}".`))
    continue
  }
  const translations = yaml.load(fs.readFileSync(translationsFile).toString()) as Translations

  const dom = new jsdom.JSDOM("")
  const { DOMParser } = dom.window
  const parser = new DOMParser()
  const document = parser.parseFromString(fs.readFileSync(imageFile).toString(), "text/xml")

  let metadataEl = document.querySelector("metadata")
  if (!metadataEl) {
    metadataEl = document.createElementNS("http://www.w3.org/2000/svg", "metadata")
    const svgEl = document.querySelector("svg")
    if (!svgEl) throw new Error(`Invalid SVG file "${imageFilename}".`)
    svgEl?.prepend(metadataEl)
  }

  const getTranslation = (lng: "de" | "en", key: string) => {
    const trans: string | undefined = translations[lng][key]
    if (!trans)
      console.error(
        chalk.red(`Missing ${lng} translation with key "${key}" in "${translationsFilename}".`)
      )
    return trans
  }

  const createTransEl = (lng: "de" | "en", key: string) => {
    const trans = getTranslation(lng, key)
    if (trans) {
      const transEl = document.createElement("Trans")
      transEl.setAttribute("lng", lng)
      transEl.innerText = trans
      return transEl
    }
    return null
  }

  const createPartEl = (id: string) => {
    const partEl = document.createElementNS(null, "Part")
    partEl.setAttribute("id", id)
    ;(["de", "en"] as const).forEach((lng) => {
      const transEl = createTransEl(lng, id)
      if (transEl) partEl.append(transEl)
    })
    return partEl
  }

  const createTitleEl = () => {
    const titleEl = document.createElementNS(null, "Title")
    ;(["de", "en"] as const).forEach((lng) => {
      const transEl = createTransEl(lng, "title")
      if (transEl) titleEl.append(transEl)
    })
    return titleEl
  }

  const titleEl = createTitleEl()
  metadataEl.append(titleEl)

  const ids: string[] = []
  const findId = (el: Element) => {
    const id = el.getAttribute("id")
    if (id) {
      ids.push(id)
    } else {
      Array.from(el.children).forEach((child) => {
        findId(child)
      })
    }
  }

  findId(document.children[0])

  for (const id of ids) {
    const partEl = createPartEl(id)
    metadataEl!.append(partEl)
  }
}
