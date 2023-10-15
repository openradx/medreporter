import { ActionIcon, Divider, Menu } from "@mantine/core"
import { TbCheck as CheckIcon } from "react-icons/tb"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { getAppConfig } from "~/utils/appConfig"
import { FlagIcon } from "./FlagIcon"

interface LanguageChooserProps {
  actionTitle: string
  currentLanguage: string
  supportedLanguages: string[]
  onLanguageChanged: (language: string) => void
  disableDebugMode?: boolean
}

export const LanguageChooser = ({
  actionTitle,
  currentLanguage,
  supportedLanguages,
  onLanguageChanged,
  disableDebugMode,
}: LanguageChooserProps) => {
  const { t } = useSiteTranslation()

  const allLanguages = [...supportedLanguages]
  const items = allLanguages
    .map((language) => ({ language, label: t(`languages.${language}`) }))
    .sort((item1, item2) => {
      if (item1.language === "asSite") return 0
      if (item2.language === "asSite") return 1
      return item1.label.localeCompare(item2.label)
    })
    .map((item) => (
      <Menu.Item
        key={item.language}
        icon={<FlagIcon language={item.language} />}
        rightSection={item.language === currentLanguage ? <CheckIcon /> : null}
        onClick={() => onLanguageChanged(item.language)}
      >
        {item.label}
      </Menu.Item>
    ))

  return (
    <Menu width={250}>
      <Menu.Target>
        <ActionIcon size="md" title={actionTitle} variant="default">
          <FlagIcon language={currentLanguage} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{t("LanguageChooser.menuTitleLanguages")}</Menu.Label>

        {items}

        {!disableDebugMode && getAppConfig().debugTranslations && (
          <>
            <Divider />
            <Menu.Item
              icon={<FlagIcon language="cimode" />}
              onClick={() => onLanguageChanged("cimode")}
            >
              Debug translations
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
