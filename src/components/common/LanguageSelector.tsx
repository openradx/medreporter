import { ActionIcon, Divider, Menu } from "@mantine/core"
import { FloatingPosition } from "@mantine/core/lib/components/Floating"
import { TbCheck } from "react-icons/tb"
import config from "../../app.config"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { FlagIcon } from "./FlagIcon"

interface LanguageSelectorProps {
  ariaLabel: string
  currentLocale: string
  supportedLocales: string[]
  onLocaleChanged: (locale: string) => void
  position?: FloatingPosition
}

export const LanguageSelector = ({
  ariaLabel,
  currentLocale,
  supportedLocales,
  onLocaleChanged,
  position = "bottom",
}: LanguageSelectorProps) => {
  const { t } = useSiteTranslation()

  const allLocales = [...supportedLocales]
  const items = allLocales
    .map((locale) => ({ locale, label: t(`LanguageSelector.${locale}`) }))
    .sort((item1, item2) => {
      if (item1.locale === "as_site") return 0
      if (item2.locale === "as_site") return 1
      return item1.label.localeCompare(item2.label)
    })
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
    <Menu width={250} shadow="md" position={position}>
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
        {config.debugTranslations && (
          <>
            <Divider />
            <Menu.Item icon={<FlagIcon code="cimode" />} onClick={() => onLocaleChanged("cimode")}>
              Debug translations
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
