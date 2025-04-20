import { useLingui } from "@lingui/react"
import { Trans } from "@lingui/react/macro"
import { ActionIcon, Divider, Menu } from "@mantine/core"
import { Check as CheckIcon } from "lucide-react"
import { appConfig } from "~/appConfig"
import { LANGUAGES } from "~/constants/lazy-translations"
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
  const { _ } = useLingui()
  const allLanguages = [...supportedLanguages]
  const items = allLanguages
    // @ts-expect-error language is a string by next.js
    .map((language) => ({ language, label: _(LANGUAGES[language]) }))
    .sort((item1, item2) => {
      if (item1.language === "asSite") return 0
      if (item2.language === "asSite") return 1
      return item1.label.localeCompare(item2.label)
    })
    .map((item) => (
      <Menu.Item
        key={item.language}
        leftSection={<FlagIcon language={item.language} />}
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
        <Menu.Label>
          <Trans>Language</Trans>
        </Menu.Label>

        {items}

        {!disableDebugMode && appConfig.debugTranslations && (
          <>
            <Divider />
            <Menu.Item
              leftSection={<FlagIcon language="cimode" />}
              onClick={() => onLanguageChanged("cimode")}
            >
              <Trans>Debug translations</Trans>
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
