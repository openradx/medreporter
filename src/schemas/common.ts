import { z } from "zod"
import { eslintLinter, config } from "~/utils/linting"

export const nodeSchema = z.object({
  nodeId: z.string(),
})

export const codeSchema = z
  .string()
  .trim()
  .max(10000)
  .refine(
    (code) => {
      const messages = eslintLinter.verify(code, config)
      return !messages.some((message) => message.severity === 2)
    },
    { message: "Invalid code" }
  )
