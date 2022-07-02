import { ReactNode } from "react"
import { ModuleContextProvider } from "../../contexts/ModuleContext"
import { ExternalLinkProps } from "./ExternalLink"

interface ModuleProps {
  id: string
  name?: string
  title?: string
  links?: ExternalLinkProps[]
  info?: ReactNode
  children?: ReactNode
}

export const Module = ({ id, name, title, links, info, children }: ModuleProps) => {
  if (name === undefined) name = id
  if (title === undefined) title = id
  return (
    <ModuleContextProvider value={{ id, name, title, links, info }}>
      {children}
    </ModuleContextProvider>
  )
}
