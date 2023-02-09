import { PrismaClient } from "@prisma/client"
import { JSDOM } from "jsdom"
import { optimize } from "svgo"
import { buildFigureTranslationArgs } from "./translations"

export function optimizeSvg(source: string) {
  return optimize(source, {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            cleanupIds: false,
            convertPathData: false,
          },
        },
      },
    ],
  }).data
}

export function syncDefaultFigure(
  prisma: PrismaClient,
  authorId: string,
  name: string,
  source: string
) {
  const dom = new JSDOM(source, { contentType: "image/svg+xml" })
  const translations = buildFigureTranslationArgs(dom.window.document)

  prisma.figure.upsert({
    where: { authorId_name: { authorId, name } },
    update: {
      name,
      source,
      optimized: optimizeSvg(source),
      translations,
    },
    create: {
      name,
      source,
      optimized: optimizeSvg(source),
      visibility: "PUBLIC",
      releaseStatus: "PUBLISHED",
      authorId,
      translations,
    },
  })
}
