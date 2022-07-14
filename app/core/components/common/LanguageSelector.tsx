import { ActionIcon, Divider, Menu } from "@mantine/core"
import { TbCheck as CheckIcon } from "react-icons/tb"
import config from "../../../../app.config"
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
        rightSection={item.locale === currentLocale ? <CheckIcon /> : null}
        onClick={() => onLocaleChanged(item.locale)}
      >
        {item.label}
      </Menu.Item>
    ))

  return (
    <Menu width={250}>
      <Menu.Target>
        <ActionIcon size="md" aria-label={ariaLabel} variant="default">
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