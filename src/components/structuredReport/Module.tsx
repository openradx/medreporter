import { ReactNode } from "react"
import { ModuleContextProvider } from "../../contexts/ModuleContext"

interface ModuleProps {
  name: string
  id: string
  title: string
  children?: ReactNode
}

export const Module = ({ name, id, title, children }: ModuleProps) => (
  <ModuleContextProvider value={{ name, id, title }}>{children}</ModuleContextProvider>
)
