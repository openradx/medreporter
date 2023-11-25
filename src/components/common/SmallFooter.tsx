import { AppShell } from "@mantine/core"
import { CopyrightMessage } from "./CopyrightMessage"

export const SmallFooter = () => (
  <AppShell.Footer h={40}>
    <CopyrightMessage />
  </AppShell.Footer>
)
