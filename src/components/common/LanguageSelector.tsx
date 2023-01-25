import { Group, Select, Text } from "@mantine/core"
import { ComponentProps, ComponentPropsWithoutRef, forwardRef, Ref } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { SupportedLanguageOption } from "~/types/general"
import { FlagIcon } from "./FlagIcon"

interface ItemProps<T extends SupportedLanguageOption> extends ComponentPropsWithoutRef<"div"> {
  image: string
  label: string
  value: T
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps<SupportedLanguageOption>>(
  ({ label, value, ...others }: ItemProps<SupportedLanguageOption>, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <FlagIcon language={value} />
        <Text size="sm">{label}</Text>
      </Group>
    </div>
  )
)

interface LanguageSelectorProps<T extends SupportedLanguageOption>
  extends Omit<ComponentProps<typeof Select>, "data"> {
  languages: T[]
  value: T
  onChange: (T: string) => void
}

export const LanguageSelector = forwardRef(
  <T extends SupportedLanguageOption>(
    { label, languages, value, ...other }: LanguageSelectorProps<T>,
    ref: Ref<HTMLInputElement>
  ) => {
    const { t } = useSiteTranslation()

    return (
      <Select
        {...other}
        ref={ref}
        label={label ?? t("LanguageSelector.inputLabelLanguage")}
        icon={<FlagIcon language={value} />}
        itemComponent={SelectItem}
        value={value}
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
