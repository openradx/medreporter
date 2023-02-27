import { PrismaClient } from "@prisma/client"
import { JSDOM } from "jsdom"
import { optimize } from "svgo"
import { FigureDocument } from "~/types/resources"
import { extractMetadata } from "~/utils/figureUtils"
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
          },
        },
      },
    ],
  })

  return data
}

export async function syncFigure(
  prisma: PrismaClient,
  authorId: string,
  name: string,
  source: string
) {
  const dom = new JSDOM(source, { contentType: "image/svg+xml" })
  const meta = extractMetadata(dom.window.document, "med")

  const figureDocument: FigureDocument = {
    svg: optimizeSvg(source),
    meta,
  }

  const translationsCreate = createFigureTranslations(meta)

  return await prisma.resource.upsert({
    where: { type_authorId_name: { type: "FIGURE", authorId, name } },
    update: {
      source,
      document: figureDocument,
      translations: { deleteMany: {}, ...translationsCreate },
    },
    create: {
      type: "FIGURE",
      name,
      source,
      document: figureDocument,
      visibility: "PUBLIC",
      releaseStatus: "PUBLISHED",
      authorId,
      translations: translationsCreate,
    },
  })
}
