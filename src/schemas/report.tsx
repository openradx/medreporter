import { z } from "zod"
import { code } from "./common"

const statement = z.object({
  type: z.literal("Statement"),
  reference: z.string(),
  text: code,
})

const conclusion = z.object({
  type: z.literal("Conclusion"),
  reference: z.string(),
  priority: z.enum(["critical", "high", "medium", "low"]),
  text: code,
})

const paragraph = z.object({
  type: z.literal("Paragraph"),
  reference: z.string(),
  hidden: code,
  children: z.array(z.union([statement, conclusion])),
})

export const report = z.array(z.union([statement, paragraph, conclusion]))
