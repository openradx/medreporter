import { z } from "zod"
import { eslintLinter, config } from "~/utils/linting"

export const nodeSchema = z.object({
  nodeId: z.string(),
})

export const sourceSchema = z.string().trim().max(10000)

export const codeSchema = sourceSchema.refine(
  (code) => {
    const messages = eslintLinter.verify(code, config)
    return !messages.some((message) => message.severity === 2)
  },
  { message: "Invalid code" }
)
