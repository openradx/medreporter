import { Group, Text } from "@mantine/core"
import { MdCopyright as CopyrightIcon } from "react-icons/md"

export const CopyrightMessage = () => (
  <Group px="xs">
    <CopyrightIcon size={20} color="grey" />
    <Text c="dimmed" fw={500} lineClamp={1}>
      2023 MedReporter. All Rights Reserved.
    </Text>
  </Group>
)
