import { Box, Text } from "@mantine/core"
import { ReactNode } from "react"
import { ParagraphContextProvider } from "~/contexts/ParagraphContext"
import { useStructureLink } from "~/hooks/useStructureLink"
import { selectOutputFormat } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
import { StructureLink } from "./StructureLink"

interface ParagraphProps {
  fieldId?: string
  title?: string
  hidden?: boolean
  list?: boolean
  children?: ReactNode
}

export const Paragraph = ({
  fieldId,
  title = "",
  hidden = false,
  list = false,
  children,
}: ParagraphProps) => {
  const { activateLink } = useStructureLink({ fieldId })
  const outputFormat = useAppSelector(selectOutputFormat)

  return (
    <Box
      sx={{
        display: hidden ? "none" : "block",
      }}
    >
      <ParagraphContextProvider value={{ list }}>
        <StructureLink onClick={activateLink}>
          {title && <Text fw={700}>{title}</Text>}
          {list && (
            <Box
              sx={{
                margin: 0,
                padding: 0,
                paddingLeft: outputFormat === "html" ? 18 : 0,
                listStyleType: outputFormat === "html" ? "square" : "none",
              }}
            >
              {children}
            </Box>
          )}
          {children}
        </StructureLink>
      </ParagraphContextProvider>
    </Box>
  )
}
