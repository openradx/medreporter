import { useLingui } from "@lingui/react/macro"
import { ActionIcon, useMantineColorScheme } from "@mantine/core"
import { Moon as MoonIcon, Sun as SunIcon } from "lucide-react"
import classes from "./ColorSchemeToggle.module.css"

export function ColorSchemeToggle() {
  const { t } = useLingui()
  const { toggleColorScheme } = useMantineColorScheme()

  return (
    <ActionIcon
      title={t`Change color scheme`}
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
