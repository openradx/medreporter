import { Box } from "@mantine/core"
import { useParagraph } from "~/contexts/ParagraphContext"
import { useStructureLink } from "~/hooks/useStructureLink"
import { selectOutputFormat } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
import { StructureLink } from "./StructureLink"

interface StatementProps {
  link?: string
  hidden?: boolean
  content?: string
}

export const Statement = ({ link, hidden, content }: StatementProps) => {
  const { activateLink } = useStructureLink({ link })

  const outputFormat = useAppSelector(selectOutputFormat)

  const paragraph = useParagraph()
  const list = paragraph?.list || false

  return (
    <StructureLink onClick={activateLink}>
      <Box display={hidden ? "none" : undefined}>
        {list && (
          <li>
            {outputFormat === "plain" && "- "}
            {content}
          </li>
        )}
        {!list && content}
      </Box>
    </StructureLink>
  )
}
