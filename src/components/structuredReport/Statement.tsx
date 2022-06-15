import { StructureLink } from "./StructureLink"

interface StatementProps {
  sectionId?: string
  moduleId?: string
  fieldId?: string
  children: string
}

export const Statement = ({ sectionId, moduleId, fieldId, children }: StatementProps) => (
  <StructureLink {...{ sectionId, moduleId, fieldId }}>{children}</StructureLink>
)
