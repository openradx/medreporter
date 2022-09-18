import { ActionIcon, Divider, Menu } from "@mantine/core"
import { TbCheck as CheckIcon } from "react-icons/tb"
import { getCountryCode } from "app/core/utils/localizationUtils"
import config from "../../../../app.config"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { FlagImage } from "./FlagImage"

interface LanguageChooserProps<T extends string> {
  actionTitle: string
  currentLanguage: T
  supportedLanguages: T[]
  onLanguageChanged: (language: T) => void
}

export const LanguageChooser = <T extends string>({
  actionTitle,
  currentLanguage,
  supportedLanguages,
  onLanguageChanged,
}: LanguageChooserProps<T>) => {
  const { t } = useSiteTranslation()

  const allLocales = [...supportedLanguages]
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
        icon={<FlagImage countryCode={getCountryCode(item.locale)} />}
        rightSection={item.locale === currentLanguage ? <CheckIcon /> : null}
        onClick={() => onLanguageChanged(item.locale)}
      >
        {item.label}
      </Menu.Item>
    ))

  return (
    <Menu width={250}>
      <Menu.Target>
        <ActionIcon size="md" title={actionTitle} variant="default">
          <FlagImage countryCode={getCountryCode(currentLanguage)} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{t("LanguageChooser.menuTitleLanguages")}</Menu.Label>

        {items}

        {config.debugTranslations && (
          <>
            <Divider />
            <Menu.Item
              icon={<FlagImage countryCode="cimode" />}
              onClick={() => onLanguageChanged("cimode" as T)}
            >
              Debug translations
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
