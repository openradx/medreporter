import { Box } from "@mantine/core"
import { useStructureLink } from "../../hooks/useStructureLink"

interface StatementProps {
  link?: boolean
  sectionId?: string
  moduleId?: string
  fieldId?: string
  children: string
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
      component="span"
      sx={{
        "&:after": { content: "' '" },
      }}
    >
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
    </Box>
  )
}
