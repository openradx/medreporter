import { optimize } from "svgo"

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
