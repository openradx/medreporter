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
    <Box component="div" sx={{ display: "inline-block" }}>
      <Box
        component="div"
        onClick={onClick}
        sx={{
          display: "inline-block",
          cursor: "pointer",
          "&:hover": { textDecoration: "underline", textDecorationStyle: "dotted" },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
