import { ReactNode } from "react"
import { useStructureLink } from "~/hooks/useStructureLink"
import { StructureLink } from "./StructureLink"

interface StatementProps {
  sectionId?: string
  moduleId?: string
  fieldId?: string
  children?: ReactNode
}

export const Statement = ({ sectionId, moduleId, fieldId, children }: StatementProps) => {
  const { activateLink } = useStructureLink({ sectionId, moduleId, fieldId })

  if (typeof children === "string") {
    children = children.trim()
  }

  return <StructureLink onClick={activateLink}>{children}</StructureLink>
}
