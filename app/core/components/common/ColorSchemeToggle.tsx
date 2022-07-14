import { ActionIcon, useMantineColorScheme } from "@mantine/core"
import { TbSun as SunIcon, TbMoon as MoonIcon } from "react-icons/tb"

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="md"
      variant="default"
      sx={(theme) => ({
        color: theme.colorScheme === "dark" ? theme.colors.yellow[4] : theme.colors.blue[6],
      })}
      aria-label="Change color scheme"
    >
      {colorScheme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </ActionIcon>
  )
}
