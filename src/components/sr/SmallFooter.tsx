import { Footer as MantineFooter } from "@mantine/core"
import { CopyrightMessage } from "./CopyrightMessage"

export const SmallFooter = () => (
  <>
    <MantineFooter
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      height={40}
    >
      <CopyrightMessage />
    </MantineFooter>
  </>
)
