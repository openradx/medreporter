import { Flex, Text } from "@mantine/core"
import { ReactNode } from "react"
import classes from "./PanelToolbar.module.css"

interface PanelToolbarProps {
  title: string
  actions?: ReactNode
}

export const PanelToolbar = ({ title, actions }: PanelToolbarProps) => (
  <Flex component="header" className={classes.panelToolbar} p="xs">
    <Text>{title}</Text>
    {actions}
  </Flex>
)
