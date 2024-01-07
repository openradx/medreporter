import { AppShell } from "@mantine/core"
import { CopyrightMessage } from "./CopyrightMessage"

export const SmallFooter = () => (
  <AppShell.Footer style={{ borderTop: "unset" }}>
    <CopyrightMessage />
  </AppShell.Footer>
)
