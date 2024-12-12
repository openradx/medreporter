import { FunctionComponent } from "react"
import { AdrenalMri } from "./adrenalMri/AdrenalMri"
import { Gfr } from "./gfr/Gfr"

export const defaultTemplateRegistry: Record<string, FunctionComponent> = {
  "adrenal-mri": AdrenalMri,
  gfr: Gfr,
}
