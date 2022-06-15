import { ReactNode } from "react"
import { SectionContextProvider } from "../../contexts/SectionContext"

interface SectionProps {
  id: string
  title: string
  visible?: boolean
  children?: ReactNode
}

export const Section = ({ id, title, visible = true, children }: SectionProps) => (
  <SectionContextProvider value={{ id, title, visible }}>{children}</SectionContextProvider>
)
