import { ActionIcon, Divider, Menu } from "@mantine/core"
import { TbCheck as CheckIcon } from "react-icons/tb"
import config from "../../../../app.config"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { FlagImage } from "./FlagImage"

interface LanguageChooserProps {
  actionTitle: string
  currentLocale: string
  supportedLocales: string[]
  onLocaleChanged: (locale: string) => void
}

export const LanguageChooser = ({
  actionTitle,
  currentLocale,
  supportedLocales,
  onLocaleChanged,
}: LanguageChooserProps) => {
  const { t } = useSiteTranslation()

  const allLocales = [...supportedLocales]
  const items = allLocales
    .map((locale) => ({ locale, label: t(`languages.${locale}`) }))
    .sort((item1, item2) => {
      if (item1.locale === "asSite") return 0
      if (item2.locale === "asSite") return 1
      return item1.label.localeCompare(item2.label)
    })
    .map((item) => (
      <Menu.Item
        key={item.locale}
        icon={<FlagImage code={item.locale} />}
        rightSection={item.locale === currentLocale ? <CheckIcon /> : null}
        onClick={() => onLocaleChanged(item.locale)}
      >
        {item.label}
      </Menu.Item>
    ))

  return (
    <Menu width={250}>
      <Menu.Target>
        <ActionIcon size="md" title={actionTitle} variant="default">
          <FlagImage code={currentLocale} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{t("LanguageChooser.menuTitleLanguages")}</Menu.Label>
        {items}
        {config.debugTranslations && (
          <>
            <Divider />
            <Menu.Item icon={<FlagImage code="cimode" />} onClick={() => onLocaleChanged("cimode")}>
              Debug translations
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
