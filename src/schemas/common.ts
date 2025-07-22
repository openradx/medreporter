import { z } from "zod"
import { config, eslintLinter } from "~/utils/linting"

export const nodeSchema = z.object({
  nodeId: z.string(),
})

export const sourceSchema = z.string().trim().max(10000)

export const codeSchema = sourceSchema.refine(
  (code) => {
    const messages = eslintLinter.verify(code, config)
    return !messages.some((message: { severity: number }) => message.severity === 2)
  },
  { message: "Invalid code" }
)

export const contentSchema = z
  .object({
    contentType: z.enum(["text", "code"]),
    contentValue: sourceSchema,
  })
  .refine(
    (node) => {
      if (node.contentType === "code") {
        const messages = eslintLinter.verify(node.contentValue, config)
        return !messages.some((message: { severity: number }) => message.severity === 2)
      }
      return true
    },
    {
      path: ["contentValue"],
      message: "Invalid code",
    }
  )
