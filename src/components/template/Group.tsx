import { Box, Flex } from "@mantine/core"
import { ReactNode } from "react"
import { GroupContextProvider } from "~/contexts/GroupContext"
import { InputLabel } from "../inputs/InputLabel"
import classes from "./Group.module.css"

interface GroupProps {
  _id?: string
  label?: string
  extras?: ReactNode
  disabled?: boolean
  hidden?: boolean
  border?: boolean
  direction?: "row" | "column"
  children?: ReactNode
}
//TODO: Needs ID?
export const Group = ({
  _id,
  label,
  extras,
  disabled,
  hidden,
  border,
  direction,
  children,
}: GroupProps) => (
  <GroupContextProvider value={{ disabled }}>
    <Box
      component="fieldset"
      display={hidden ? "none" : undefined}
      className={border ? classes.groupBorder : classes.groupNoBorder}
    >
      {(label || extras) && (
        <Box component="legend">
          <InputLabel label={label} extras={extras} />
        </Box>
      )}
      <Flex direction={direction} gap={{ base: "sm", sm: "lg" }} wrap="wrap">
        {children}
      </Flex>
    </Box>
  </GroupContextProvider>
)
