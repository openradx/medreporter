import { Flex } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { ReactNode } from "react"

interface TemplateProps {
  slug: string
  title: string
  description?: string
  categories?: string[]
  language?: string
  info?: string
  children: ReactNode
}

export const Template = ({ children }: TemplateProps) => {
  const matches = useMediaQuery("(max-width: 68em)")

  return (
    <Flex w="100%" h="100%" miw={0} align="stretch" gap="1%" direction={matches ? "column" : "row"}>
      {children}
    </Flex>
  )
}
