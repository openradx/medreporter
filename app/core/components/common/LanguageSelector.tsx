import { Group, Select, Text } from "@mantine/core"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { getCountryCode } from "app/core/utils/localizationUtils"
import { FlagImage } from "./FlagImage"

interface ItemProps extends ComponentPropsWithoutRef<"div"> {
  image: string
  label: string
  value: string
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, value, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <FlagImage countryCode={getCountryCode(value)} />
        <Text size="sm">{label}</Text>
      </Group>
    </div>
  )
)

interface LanguageSelectorProps {
  languages: string[]
  value: string
  onChange: (language: string) => void
}

export const LanguageSelector = ({ languages, value, onChange }: LanguageSelectorProps) => {
  const { t } = useSiteTranslation()

  return (
    <Select
      label={t("LanguageSelector.inputLabelMainLanguage")}
      description={t("LanguageSelector.inputDescriptionMainLanguage")}
      itemComponent={SelectItem}
      value={value}
      onChange={onChange}
      data={languages
        .map((language) => ({
          value: language,
          label: t(`languages.${language}`),
        }))
        .sort((c1, c2) => c1.label.localeCompare(c2.label))}
    />
  )
}
