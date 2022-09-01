import { ActionIcon, useMantineColorScheme } from "@mantine/core"
import { TbSun as SunIcon, TbMoon as MoonIcon } from "react-icons/tb"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"

export function ColorSchemeToggle() {
  const { t } = useSiteTranslation()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <ActionIcon
      title={t("ColorSchemeToggle.button_label_toggle")}
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
