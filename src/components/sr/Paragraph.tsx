import { ReactNode } from "react"
import { useStructureLink } from "~/hooks/useStructureLink"
import { StructureLink } from "./StructureLink"

interface ParagraphProps {
  fieldId?: string
  children?: ReactNode
}

export const Paragraph = ({ fieldId, children }: ParagraphProps) => {
  const { activateLink } = useStructureLink({ fieldId })

  return <StructureLink onClick={activateLink}>{children}</StructureLink>
}
