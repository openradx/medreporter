import { Box } from "@mantine/core"
import { ReactNode, useRef } from "react"

interface ParagraphProps {
  children?: ReactNode
}

export const Paragraph = ({ children }: ParagraphProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const siblings = elementRef.current?.parentElement?.children ?? []
  const last = siblings.length === 0 || siblings[siblings.length - 1] === elementRef.current

  return (
    <Box ref={elementRef}>
      {children}
      <br />
      {!last && <br />}
    </Box>
  )
}
