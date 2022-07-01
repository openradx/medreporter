import { Text } from "@mantine/core"
import { ReactNode } from "react"

interface DescriptionProps {
  children: ReactNode
}

export const Description = ({ children }: DescriptionProps) => <Text weight={500}>{children}</Text>
