import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { useStructureLink } from "../../hooks/useStructureLink"

interface StatementProps {
  link?: boolean
  sectionId?: string
  moduleId?: string
  fieldId?: string
  last?: boolean
  children?: ReactNode
}

export const Statement = ({
  link = false,
  sectionId,
  moduleId,
  fieldId,
  last,
  children,
}: StatementProps) => {
  const activateLink = useStructureLink({ sectionId, moduleId, fieldId })

  if (typeof children === "string") {
    children = children.trim()
  }

  return (
    <Box component="span">
      <Box
        component="span"
        onClick={() => link && activateLink()}
        sx={{
          ...(link && {
            cursor: "pointer",
            "&:hover": { textDecoration: "underline", textDecorationStyle: "dotted" },
          }),
        }}
      >
        {children}
      </Box>
      {!last && " "}
    </Box>
  )
}
