import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { useStructureLink } from "../../hooks/useStructureLink"

interface StatementProps {
  link?: boolean
  sectionId?: string
  moduleId?: string
  fieldId?: string
  children?: ReactNode
}

export const Statement = ({
  link = false,
  sectionId,
  moduleId,
  fieldId,
  children,
}: StatementProps) => {
  const activateLink = useStructureLink({ sectionId, moduleId, fieldId })

  return (
    <Box
      component="div"
      sx={{
        "&:after": { content: "' '" },
      }}
    >
      <Box
        component="div"
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
    </Box>
  )
}
