import { optimize } from "svgo"

export function optimizeSvg(source: string): string {
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
