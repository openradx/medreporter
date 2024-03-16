import { Box } from "@mantine/core"
import { ReactNode } from "react"

interface StructureLinkProps {
  enabled?: boolean
  onClick?: () => void
  children?: ReactNode
}

export const StructureLink = ({ enabled = true, onClick, children }: StructureLinkProps) => {
  if (!enabled) {
    return <>{children}</>
  }

  return (
    <Box
      component="div"
      onClick={onClick}
      display="inline-block"
      style={{
        cursor: "pointer",
        "&:hover": { textDecoration: "underline", textDecorationStyle: "dotted" },
      }}
      w="100%"
    >
      {children}
    </Box>
  )
}
