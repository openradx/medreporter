import { Group } from "@mantine/core"
import { CopyrightMessage } from "./CopyrightMessage"

export const TallFooter = () => (
  <>
    <Group justify="center" align="center" h={60} w="100%">
      <CopyrightMessage />
    </Group>
  </>
)
