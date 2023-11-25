import { ActionIcon, useMantineColorScheme } from "@mantine/core"
import { TbSun as SunIcon, TbMoon as MoonIcon } from "react-icons/tb"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import classes from "./ColorSchemeToggle.module.css"

export function ColorSchemeToggle() {
  const { t } = useSiteTranslation()
  const { toggleColorScheme } = useMantineColorScheme()

  return (
    <ActionIcon
      title={t("ColorSchemeToggle.buttonToggleTheme")}
      aria-label="Change color scheme"
      className={classes.root}
      size="md"
      variant="default"
      onClick={() => toggleColorScheme()}
    >
      <SunIcon className={classes.sun} size={18} />
      <MoonIcon className={classes.moon} size={18} />
    </ActionIcon>
  )
}
