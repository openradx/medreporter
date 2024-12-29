import { Select } from "@mantine/core"
import appConfig from "app.config"
import { useFilter } from "~/contexts/FilterContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const LanguageFilter = () => {
  const { t } = useSiteTranslation()
  const filter = useFilter()

  return (
    <Select
      label={t("LanguageFilter.inputLabel")}
      value={filter.language === "" ? null : filter.language}
      onChange={(value) => filter.setLanguage(value ?? "")}
      data={appConfig.supportedTemplateLanguages.map((language) => ({
        value: language,
        label: t(`languages.${language}`),
      }))}
      searchable
      clearable
      allowDeselect
    />
  )
}
