import { Box, Text } from "@mantine/core"
import { ReactNode } from "react"
import { SectionContextProvider } from "../../contexts/SectionContext"
import { useStructuredReport } from "../../contexts/StructuredReportContext"
import { activateSection } from "../../state/displaySlice"
import { useAppDispatch } from "../../state/store"

interface SectionProps {
  id: string
  title?: string
  active?: boolean
  link?: boolean
  children?: ReactNode
}

export const Section = ({ id, title, active = true, link = false, children }: SectionProps) => {
  const { context } = useStructuredReport()
  const dispatch = useAppDispatch()

  const activateLink = () => {
    dispatch(activateSection({ sectionId: id }))
  }

  if (title === undefined) title = id

  return (
    <SectionContextProvider value={{ id, title, active }}>
      {context === "structure" && (
        <Box
          className="medreporter-Section-structure"
          sx={{
            display: active ? "flex" : "none",
            flexDirection: "column",
            alignItems: "stretch",
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
