import { Box, Text } from "@mantine/core"
import { ReactNode } from "react"
import { SectionContextProvider } from "../../contexts/SectionContext"
import { useStructuredReport } from "../../contexts/StructuredReportContext"
import { useAppDispatch } from "../../state/store"
import { activateSection } from "../../state/structureSlice"

interface SectionProps {
  id: string
  title?: string
  visible?: boolean
  link?: boolean
  children?: ReactNode
}

export const Section = ({ id, title, visible = true, link = false, children }: SectionProps) => {
  const { context } = useStructuredReport()
  const dispatch = useAppDispatch()

  const activateLink = () => {
    dispatch(activateSection({ sectionId: id }))
  }

  return (
    <SectionContextProvider value={{ id, visible }}>
      {context === "structure" && (
        <Box
          className="medreporter-Section-structure"
          sx={{
            display: visible ? "flex" : "none",
            flexDirection: "column",
            alignItems: "stretch",
            height: "100%",
          }}
        >
          {children}
        </Box>
      )}
      {context === "report" && (
        <Box
          className="medreporter-Section-report"
          sx={{
            "&:not(:last-child)": {
              marginBottom: "1em",
            },
          }}
        >
          {title && (
            <Text>
              <Box
                component="span"
                onClick={() => link && activateLink()}
                sx={{
                  ...(link && {
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline", textDecorationStyle: "dashed" },
                  }),
                }}
              >
                {title}:
              </Box>
            </Text>
          )}
          <Box>{children}</Box>
        </Box>
      )}
    </SectionContextProvider>
  )
}
