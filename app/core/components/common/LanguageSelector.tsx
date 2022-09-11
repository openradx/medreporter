import { Group, Select, Text } from "@mantine/core"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { getCountryCode } from "app/core/utils/localizationUtils"
import { FlagImage } from "./FlagImage"

const data = [
  {
    image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
    value: "DE",
    label: "Bender Bending Rodríguez",
  },
]

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

export const LanguageSelector = () => {
  const { t } = useSiteTranslation()

  return (
    <Select
      label={t("LanguageSelector.inputLabelMainLanguage")}
      description={t("LanguageSelector.inputDescriptionMainLanguage")}
      itemComponent={SelectItem}
      data={data}
    />
  )
}
