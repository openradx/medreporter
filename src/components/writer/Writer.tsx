import { Flex, Paper } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { Editor } from "./Editor"

export const Writer = () => {
  const matches = useMediaQuery("(min-width: 68em)")

  return (
    <Flex w="100%" h="100%" miw={0} align="stretch" gap="1%" direction={matches ? "row" : "column"}>
      <Paper
        style={{
          width: matches ? "50%" : "100%",
          height: matches ? "100%" : "50%",
          display: "flex",
          flexDirection: "column",
        }}
        shadow="sm"
        withBorder
      >
        <Editor />
      </Paper>
      <Paper
        style={{
          width: matches ? "49%" : "100%",
          height: matches ? "100%" : "49%",
          display: "flex",
          flexDirection: "column",
        }}
        shadow="sm"
        withBorder
      ></Paper>
    </Flex>
  )
}
