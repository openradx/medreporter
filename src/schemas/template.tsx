import { z } from "zod"
import { report } from "./report"
import { structure } from "./structure"

export const template = z.object({
  structure,
  report,
})

export type Template = z.infer<typeof template>
