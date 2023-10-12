import { Group } from "@mantine/core"
import { CopyrightMessage } from "./CopyrightMessage"

export const TallFooter = () => (
  <>
    <Group
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        width: "100%",
      }}
    >
      <CopyrightMessage />
    </Group>
  </>
)
