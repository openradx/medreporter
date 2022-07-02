import { Group } from "@mantine/core"
import { ReactNode } from "react"

interface InputLabelProps {
  label?: string
  extras?: ReactNode
}

export const InputLabel = ({ label, extras }: InputLabelProps) => (
  <Group sx={{ alignContent: "center" }} spacing={2}>
    {label}
    {extras}
  </Group>
)
