import { Box, Flex } from "@mantine/core"
import { ReactNode } from "react"
import { GroupContextProvider } from "~/contexts/GroupContext"
import { InputLabel } from "../inputs/InputLabel"

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
      <>
        {children}
        <Box sx={{ height: 0, flexBasis: "100%" }} />
      </>
    )
  }
  return (
    <GroupContextProvider value={{ disabled }}>
      <Box
        component="fieldset"
        sx={(theme) => ({
          display: hidden ? "none" : undefined,
          flexBasis: "100%",
          border: `1px solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
          }`,
        })}
        my="sm"
      >
        {(label || extras) && (
          <Box component="legend" sx={{ padding: "0 6px" }}>
            <InputLabel label={label} extras={extras} />
          </Box>
        )}
        <Flex gap={{ base: "sm", sm: "lg" }}>{children}</Flex>
      </Box>
    </GroupContextProvider>
  )
}
