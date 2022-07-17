import { Box, Grid, Text } from "@mantine/core"
import { ReactNode } from "react"

interface GridGroupProps {
  label?: string
  children?: ReactNode
}

export const GridGroup = ({ label, children }: GridGroupProps) => {
  if (!label) {
    return (
      <>
        {children}
        <Box sx={{ height: 0, flexBasis: "100%" }} />
      </>
    )
  }

  return (
    <Grid.Col span={12}>
      <Box
        component="fieldset"
        sx={(theme) => ({
          flexBasis: "100%",
          border: `1px solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
          }`,
        })}
      >
        <Box component="legend" sx={{ padding: "0 6px" }}>
          <Text size="sm" weight={700}>
            {label}
          </Text>
        </Box>
        <Grid>{children}</Grid>
      </Box>
    </Grid.Col>
  )
}
