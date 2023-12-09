import { Box, Flex } from "@mantine/core"
import { ReactNode } from "react"
import { GroupContextProvider } from "~/contexts/GroupContext"
import { InputLabel } from "../inputs/InputLabel"
import classes from "./Group.module.css"

interface GridGroupProps {
  label?: string
  extras?: ReactNode
  disabled?: boolean
  hidden?: boolean
  children?: ReactNode
}

export const Group = ({ label, extras, disabled, hidden, children }: GridGroupProps) => {
  if (!label) {
    return (
      <Box
        component="fieldset"
        display={hidden ? "none" : undefined}
        className={classes.group}
        my="sm"
      >
        <Flex wrap="wrap" gap={{ base: "sm", sm: "lg" }}>
          {children}
        </Flex>
      </Box>
    )
  }
  return (
    <GroupContextProvider value={{ disabled }}>
      <Box
        component="fieldset"
        display={hidden ? "none" : undefined}
        className={classes.group}
        my="sm"
      >
        {(label || extras) && (
          <Box component="legend" px={0} py={6}>
            <InputLabel label={label} extras={extras} />
          </Box>
        )}
        <Flex gap={{ base: "sm", sm: "lg" }} wrap="wrap">
          {children}
        </Flex>
      </Box>
    </GroupContextProvider>
  )
}
