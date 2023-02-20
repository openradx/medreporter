/* eslint-disable no-console */
import chalk from "chalk"
import fs from "fs"
import glob from "glob"
import yaml from "js-yaml"
import { JSDOM } from "jsdom"
import path from "path"
import { format } from "prettier"

const NS = "http://www.medreporter.org/reference/figure"

const projectDir = process.cwd()

const INPUT_FOLDER = path.join(projectDir, "resources", "figures")
const OUTPUT_FOLDER = path.join(projectDir, "prisma", "seeds", "figures")

if (!fs.lstatSync(OUTPUT_FOLDER).isDirectory()) {
  throw new Error(`Invalid output directory "${OUTPUT_FOLDER}".`)
}

type Translations = { [lng: string]: { [key: string]: string } }

const figureFiles = glob.sync("**/*.svg", {
  cwd: INPUT_FOLDER,
  absolute: true,
})

for (const figureFile of figureFiles) {
  const figureFilename = path.basename(figureFile)

  /* Load translations */
  const translationsFile = figureFile.replace(".svg", ".yml")
  const translationsFilename = path.basename(translationsFile)
  const translationsFileExists = fs.existsSync(translationsFile)
  if (!translationsFileExists) {
    console.error(chalk.red(`Missing translation file of "${figureFilename}".`))
    continue
  }
  const translations = yaml.load(fs.readFileSync(translationsFile).toString()) as Translations

  const lngs = Object.keys(translations)

  const dom = new JSDOM(fs.readFileSync(figureFile).toString(), { contentType: "image/svg+xml" })
  const { document: doc } = dom.window

  let metadataEl = doc.querySelector("metadata")
  if (!metadataEl) {
    metadataEl = doc.createElementNS("http://www.w3.org/2000/svg", "metadata")
    metadataEl.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:med", NS)
    const svgEl = doc.querySelector("svg")
    if (!svgEl) {
      console.error(chalk.red(`Invalid SVG file "${figureFilename}".`))
      continue
    }
    svgEl?.prepend(metadataEl)
  }

  const figureEl = doc.createElementNS(NS, "med:Figure")
  figureEl.setAttribute("lngs", lngs.join(","))
  metadataEl.prepend(figureEl)

  const createTransEl = (lng: string, key: string) => {
    const trans: string | undefined = translations[lng][key]
    if (trans) {
      const transEl = doc.createElementNS(NS, "med:Trans")
      transEl.setAttribute("lng", lng)
      transEl.textContent = trans
      return transEl
    }
    return null
  }

  const titleEl = doc.createElementNS(NS, "med:Title")
  lngs.forEach((lng) => {
    const transEl = createTransEl(lng, "title")
    if (!transEl) console.error(chalk.red(`Missing title in "${translationsFilename}".`))
    else titleEl.append(transEl)
  })
  figureEl.append(titleEl)

  let descriptionFound = false
  const descriptionEl = doc.createElementNS(NS, "med:Description")
  lngs.forEach((lng) => {
    const transEl = createTransEl(lng, "description")
    if (transEl) {
      descriptionFound = true
      descriptionEl.append(transEl)
    }
  })
  if (descriptionFound) figureEl.append(descriptionEl)

  // fetch all ids in the SVG
  const svgEl = doc.querySelector("svg")
  if (!svgEl) {
    console.error(chalk.red(`Invalid SVG figure file "${figureFilename}".`))
    continue
  }
  const svgIds = Array.from(svgEl.querySelectorAll('*[id]:not([id=""]')).map((el) => el.id)

  const duplicateSvgIds = svgIds.filter((id, index) => svgIds.indexOf(id) !== index)
  if (duplicateSvgIds.length > 0)
    console.error(
      chalk.red(`Figure file "${figureFilename}" has duplicate ids: ${duplicateSvgIds.join(", ")}`)
    )

  const translationIds: string[] = []
  lngs.forEach((lng) => {
    Object.keys(translations[lng]).forEach((key) => {
      if (!["title", "description"].includes(key)) {
        lngs.forEach((lng2) => {
          if (!(key in translations[lng2]))
            console.error(
              chalk.red(
                `Missing "${lng2}" translation for id "${key}" in "${translationsFilename}".`
              )
            )
          if (!svgIds.includes(key))
            console.error(chalk.red(`Missing id "${key}" in SVG figure "${figureFilename}".`))

          if (!translationIds.includes(key)) translationIds.push(key)
        })
      }
    })
  })

  const createOptionEl = (id: string) => {
    const partEl = doc.createElementNS(NS, "med:Option")
    partEl.setAttribute("id", id)
    lngs.forEach((lng) => {
      const transEl = createTransEl(lng, id)
      if (transEl) partEl.append(transEl)
    })
    return partEl
  }

  for (const id of translationIds) {
    const partEl = createOptionEl(id)
    figureEl.append(partEl)
  }

  const processedFile = path.join(OUTPUT_FOLDER, figureFilename)
  const output = doc.documentElement.outerHTML
  fs.writeFileSync(
    processedFile,
    format(output, {
      filepath: processedFile,
      plugins: [require.resolve("@prettier/plugin-xml")],
      xmlWhitespaceSensitivity: "ignore",
      singleAttributePerLine: false,
      printWidth: Number.MAX_SAFE_INTEGER,
    })
  )
  console.log(chalk.green(`Successfully written "${figureFilename}".`))
}
