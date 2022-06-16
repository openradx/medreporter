import { ReactNode } from "react"
import { ModuleContextProvider } from "../../contexts/ModuleContext"

interface ModuleProps {
  id: string
  name?: string
  children?: ReactNode
}

export const Module = ({ id, name, children }: ModuleProps) => (
  <ModuleContextProvider value={{ id, name }}>{children}</ModuleContextProvider>
)
