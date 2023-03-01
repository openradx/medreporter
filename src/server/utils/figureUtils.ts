import { JSDOM } from "jsdom"
import { optimize } from "svgo"
import { FigureDocument } from "~/types/resources"
import { extractMetadata } from "~/utils/figureUtils"

function optimizeSvg(source: string) {
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

export function createFigureDocument(source: string): FigureDocument {
  const dom = new JSDOM(source, { contentType: "image/svg+xml" })
  const meta = extractMetadata(dom.window.document, "med")

  return {
    svg: optimizeSvg(source),
    meta,
  }
}
