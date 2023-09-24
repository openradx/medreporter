import { z } from "zod"
import { report } from "./report"
import { structure } from "./structure"

export const document = z.object({
  structure,
  report,
})
