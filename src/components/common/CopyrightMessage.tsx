import { Group, Text } from "@mantine/core"
import { MdCopyright as CopyrightIcon } from "react-icons/md"

export const CopyrightMessage = () => (
  <Group p={4} gap={8} align="center" justify="center">
    <CopyrightIcon size={16} color="grey" />
    <Text size="sm" c="dimmed" fw={500} lineClamp={1}>
      2023 MedReporter. All Rights Reserved.
    </Text>
  </Group>
)
