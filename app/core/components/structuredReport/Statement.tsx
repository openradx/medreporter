import { Box } from "@mantine/core"
import { ReactNode, useRef } from "react"
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

  const elementRef = useRef<HTMLSpanElement>(null)
  const siblings = elementRef.current?.parentElement?.children ?? []
  const last = siblings.length === 0 || siblings[siblings.length - 1] === elementRef.current

  if (typeof children === "string") {
    children = children.trim()
  }

  return (
    <span ref={elementRef}>
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
    </span>
  )
}
