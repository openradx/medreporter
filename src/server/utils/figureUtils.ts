import { PrismaClient } from "@prisma/client"
import { JSDOM } from "jsdom"
import { optimize } from "svgo"
import { createFigureTranslations } from "./resourceUtils"

export function optimizeSvg(source: string) {
  const { data } = optimize(source, {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            cleanupIds: false,
            convertPathData: false,
            removeMetadata: false,
          },
        },
      },
    ],
  })

  return data
}

export async function syncDefaultFigure(
  prisma: PrismaClient,
  authorId: string,
  name: string,
  source: string
) {
  const dom = new JSDOM(source, { contentType: "image/svg+xml" })
  const translations = createFigureTranslations(dom.window.document)

  return await prisma.resource.upsert({
    where: { type_authorId_name: { type: "FIGURE", authorId, name } },
    update: {
      name,
      source,
      document: optimizeSvg(source),
      translations,
    },
    create: {
      type: "FIGURE",
      name,
      source,
      document: optimizeSvg(source),
      visibility: "PUBLIC",
      releaseStatus: "PUBLISHED",
      authorId,
      translations,
    },
  })
}
