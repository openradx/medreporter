import { Group, Text, Tooltip } from "@mantine/core"
import { MdInfoOutline as InfoIcon } from "react-icons/md"

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
