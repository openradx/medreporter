import { Group, Text } from "@mantine/core"
import { Copyright as CopyrightIcon } from "lucide-react"

export const CopyrightMessage = () => (
  <Group p={4} gap={8} align="center" justify="center">
    <CopyrightIcon size={16} color="grey" />
    <Text size="sm" c="dimmed" fw={500} lineClamp={1}>
      {/* eslint-disable i18next/no-literal-string */}
      2024 MedReporter. All Rights Reserved.
      {/* eslint-enable i18next/no-literal-string */}
    </Text>
  </Group>
)
