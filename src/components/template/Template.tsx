import { Flex } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { ReactNode } from "react"

interface TemplateProps {
  title: string
  name: string
  description?: string
  categories?: string[]
  language?: string
  info?: string
  children: ReactNode
}

// TODO: use title and info, remove eslint disable
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Template = ({ children }: TemplateProps) => {
  const matches = useMediaQuery("(max-width: 68em)")

  return (
    <Flex w="100%" h="100%" miw={0} align="stretch" gap="xs" direction={matches ? "column" : "row"}>
      {children}
    </Flex>
  )
}
