import { Box, Flex } from "@mantine/core"
import { ReactNode } from "react"
import { GroupContextProvider } from "~/contexts/GroupContext"
import { InputLabel } from "../inputs/InputLabel"
import classes from "./Group.module.css"

interface GroupProps {
  label?: string
  extras?: ReactNode
  disabled?: boolean
  hidden?: boolean
  border?: boolean
  direction?: "row" | "column"
  justify?: "start" | "center" | "end" | "space-between" | "space-around"
  children?: ReactNode
}

export const Group = ({
  label,
  extras,
  disabled,
  hidden,
  border,
  direction,
  justify,
  children,
}: GroupProps) => (
  <GroupContextProvider value={{ disabled }}>
    <Box
      component="fieldset"
      display={hidden ? "none" : undefined}
      className={border ? classes.groupBorder : classes.groupNoBorder}
    >
      {(label || extras) && (
        <Box component="legend" px={0} py={6}>
          <InputLabel label={label} extras={extras} />
        </Box>
      )}
      <Flex direction={direction} justify={justify} gap={{ base: "sm", sm: "lg" }} wrap="wrap">
        {children}
      </Flex>
    </Box>
  </GroupContextProvider>
)
