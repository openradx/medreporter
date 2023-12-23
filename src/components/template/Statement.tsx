import { ReactNode } from "react"
import { useParagraph } from "~/contexts/ParagraphContext"
import { useStructureLink } from "~/hooks/useStructureLink"
import { selectOutputFormat } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
import { StructureLink } from "./StructureLink"

interface StatementProps {
  link?: string
  content?: ReactNode
}

export const Statement = ({ link, content }: StatementProps) => {
  const { activateLink } = useStructureLink({ link })

  const outputFormat = useAppSelector(selectOutputFormat)

  const paragraph = useParagraph()
  const list = paragraph?.list || false

  return (
    <StructureLink onClick={activateLink}>
      {list && (
        <li>
          {outputFormat === "plain" && "- "}
          {content}
        </li>
      )}
      {!list && content}
    </StructureLink>
  )
}
