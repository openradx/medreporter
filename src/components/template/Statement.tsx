import { ReactNode } from "react"
import { useParagraph } from "~/contexts/ParagraphContext"
import { useStructureLink } from "~/hooks/useStructureLink"
import { selectOutputFormat } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
import { StructureLink } from "./StructureLink"

interface StatementProps {
  fieldId?: string
  children?: ReactNode
}

export const Statement = ({ fieldId, children }: StatementProps) => {
  const { activateLink } = useStructureLink({ fieldId })
  const outputFormat = useAppSelector(selectOutputFormat)

  const paragraph = useParagraph()
  const list = paragraph?.list || false

  return (
    <StructureLink onClick={activateLink}>
      {list && (
        <li>
          {outputFormat === "plain" && "- "}
          {children}
        </li>
      )}
      {!list && children}
    </StructureLink>
  )
}
