import { Box } from "@mantine/core"
import { cloneElement, isValidElement, ReactNode } from "react"
import flattenChildren from "react-keyed-flatten-children"
import { Statement } from "./Statement"

interface ParagraphProps {
  last?: boolean
  children?: ReactNode
}

export const Paragraph = ({ last, children }: ParagraphProps) => (
  <Box>
    {flattenChildren(children).map((child, index, array) => {
      if (isValidElement(child) && child.type === Statement) {
        return cloneElement(child, { last: index === array.length - 1 })
      }
      return child
    })}
    <br />
    {!last && <br />}
  </Box>
)
