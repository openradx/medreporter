import { ReactNode } from "react"
import { ExternalLinkProps } from "~/components/sr/ExternalLink"
import { createRequiredContext } from "~/utils/createRequiredContext"

interface ModuleContext {
  id: string
  name: string
  title?: string
  links?: ExternalLinkProps[]
  info?: ReactNode
}

export const [useModule, ModuleContextProvider] =
  createRequiredContext<ModuleContext>("ModuleContext")
