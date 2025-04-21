import { Trans } from "@lingui/react/macro"
import { Group, Text } from "@mantine/core"
import { Copyright as CopyrightIcon } from "lucide-react"
import classes from "./CopyrightMessage.module.css"

export const CopyrightMessage = () => (
  <Group p={4} gap={8} align="center" justify="center">
    <CopyrightIcon size={16} className={classes.copyrightIcon} />
    <Text size="sm" className={classes.copyrightMessage}>
      <Trans>2024 MedReporter. All Rights Reserved.</Trans>
    </Text>
  </Group>
)
