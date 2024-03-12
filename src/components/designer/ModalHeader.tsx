import { Group, Text, Tooltip } from "@mantine/core"
import { Info as InfoIcon } from "lucide-react"

interface EditorModalTitleProps {
  title: string
  info: string
}

export const EditorModalTitle = ({ title, info }: EditorModalTitleProps) => (
  <Group gap="xs">
    <Text>{title}</Text>
    <Tooltip label={info} position="bottom-start">
      <div>
        <InfoIcon size={20} />
      </div>
    </Tooltip>
  </Group>
)
