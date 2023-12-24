import { Box, Text } from "@mantine/core"
import { ReactNode } from "react"
import { ParagraphContextProvider } from "~/contexts/ParagraphContext"
import { useStructureLink } from "~/hooks/useStructureLink"
import { selectOutputFormat } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
import { StructureLink } from "./StructureLink"

interface ParagraphProps {
  link?: string
  title?: string
  hidden?: boolean
  list?: boolean
  children?: ReactNode
}

export const Paragraph = ({
  link,
  title = "",
  hidden = false,
  list = false,
  children,
}: ParagraphProps) => {
  const { activateLink } = useStructureLink({ link })
  const outputFormat = useAppSelector(selectOutputFormat)

  return (
    <Box display={hidden ? "none" : "block"}>
      <ParagraphContextProvider value={{ list }}>
        <StructureLink onClick={activateLink}>
          {title && <Text fw={700}>{title}</Text>}
          {list && (
            <Box
              m={0}
              p={0}
              pl={outputFormat === "html" ? 18 : 0}
              style={{
                listStyleType: outputFormat === "html" ? "square" : "none",
              }}
            >
              {children}
            </Box>
          )}
          {!list && children}
        </StructureLink>
      </ParagraphContextProvider>
    </Box>
  )
}
