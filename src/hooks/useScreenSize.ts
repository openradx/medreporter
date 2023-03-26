import { useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl"

export const useScreenSize = (): ScreenSize => {
  const theme = useMantineTheme()

  const sm = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`)
  const md = useMediaQuery(`(min-width: ${theme.breakpoints.md})`)
  const lg = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`)
  const xl = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`)

  let screenSize: ScreenSize = "xs"
  if (sm) screenSize = "sm"
  if (md) screenSize = "md"
  if (lg) screenSize = "lg"
  if (xl) screenSize = "xl"

  return screenSize
}
