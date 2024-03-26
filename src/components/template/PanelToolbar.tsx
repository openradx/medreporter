import { Flex, Group, Text } from "@mantine/core"
import { ReactNode } from "react"
import classes from "./PanelToolbar.module.css"

interface PanelToolbarProps {
  title: string
  actions?: ReactNode
  actionsPosition?: "center" | "right"
}

export const PanelToolbar = ({
  title,
  actions,
  actionsPosition: buttonPosition = "center",
}: PanelToolbarProps) => (
  <Flex
    h={52}
    className={classes.panelToolbar}
    p="xs"
    pos="relative"
    style={{ justifyContent: buttonPosition === "right" ? "space-between" : "inherit" }}
  >
    <Text size="lg" fw={500}>
      {title}
    </Text>
    <Group gap="xs" className={buttonPosition === "center" ? classes.centerActions : undefined}>
      {actions}
    </Group>
  </Flex>
)
