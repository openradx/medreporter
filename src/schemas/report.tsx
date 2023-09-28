import { z } from "zod"
import { code, element } from "./common"

const statement = element.extend({
  type: z.literal("Statement"),
  reference: z.string().optional(),
  text: code.optional(),
})

export type Statement = z.infer<typeof statement>

const conclusion = element.extend({
  type: z.literal("Conclusion"),
  reference: z.string().optional(),
  priority: z.enum(["critical", "high", "medium", "low"]).optional(),
  text: code.optional(),
})

export type Conclusion = z.infer<typeof conclusion>

const paragraph = element.extend({
  type: z.literal("Paragraph"),
  reference: z.string().optional(),
  hidden: code.optional(),
  children: z.array(z.union([statement, conclusion])).optional(),
})

export type Paragraph = z.infer<typeof paragraph>

export const report = z.array(z.union([statement, paragraph, conclusion]))

export type ReportElement = Statement | Conclusion | Paragraph
