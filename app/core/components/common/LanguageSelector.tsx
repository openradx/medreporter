import { Group, Select, Text } from "@mantine/core"
import { ComponentProps, ComponentPropsWithoutRef, forwardRef, Ref } from "react"
import { SupportedLanguage } from "types"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { FlagImage } from "./FlagImage"

interface ItemProps<T extends SupportedLanguage> extends ComponentPropsWithoutRef<"div"> {
  image: string
  label: string
  value: T
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps<SupportedLanguage>>(
  ({ image, label, value, ...others }: ItemProps<SupportedLanguage>, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <FlagImage language={value} />
        <Text size="sm">{label}</Text>
      </Group>
    </div>
  )
)

interface LanguageSelectorProps<T extends SupportedLanguage>
  extends Omit<ComponentProps<typeof Select>, "data"> {
  languages: T[]
  value: T
  onChange: (T: string) => void
}

export const LanguageSelector = forwardRef(
  <T extends SupportedLanguage>(
    { languages, ...other }: LanguageSelectorProps<T>,
    ref: Ref<HTMLInputElement>
  ) => {
    const { t } = useSiteTranslation()

    return (
      <Select
        {...other}
        ref={ref}
        label={t("LanguageSelector.inputLabelMainLanguage")}
        description={t("LanguageSelector.inputDescriptionMainLanguage")}
        itemComponent={SelectItem}
        data={languages
          .map((language) => ({
            value: language,
            label: t(`languages.${language}`),
          }))
          .sort((c1, c2) => c1.label.localeCompare(c2.label))}
      />
    )
  }
)
