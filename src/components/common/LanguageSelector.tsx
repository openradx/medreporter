import { ActionIcon, Menu } from "@mantine/core"
import { TbCheck } from "react-icons/tb"
import config from "../../app.config"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { FlagIcon } from "./FlagIcon"

interface LanguageSelectorProps {
  ariaLabel: string
  currentLocale: string
  supportedLocales: string[]
  onLocaleChanged: (locale: string) => void
}

export const LanguageSelector = ({
  ariaLabel,
  currentLocale,
  supportedLocales,
  onLocaleChanged,
}: LanguageSelectorProps) => {
  const { t } = useSiteTranslation()

  const allLocales = [...supportedLocales]
  if (config.debugTranslations) {
    allLocales.push("cimode")
  }

  const items = allLocales
    .map((locale) => ({ locale, label: t(`LanguageSelector.${locale}`) }))
    .sort((item1, item2) => item1.label.localeCompare(item2.label))
    .map((item) => (
      <Menu.Item
        key={item.locale}
        icon={<FlagIcon code={item.locale} />}
        rightSection={item.locale === currentLocale ? <TbCheck /> : null}
        onClick={() => onLocaleChanged(item.locale)}
      >
        {item.label}
      </Menu.Item>
    ))

  return (
    <Menu width={250} shadow="md" withArrow>
      <Menu.Target>
        <ActionIcon
          size="md"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.colors.yellow[4] : theme.colors.blue[6],
          })}
          aria-label={ariaLabel}
        >
          <FlagIcon code={currentLocale} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{t("LanguageSelector.label")}</Menu.Label>
        {items}
      </Menu.Dropdown>
    </Menu>
  )
}
