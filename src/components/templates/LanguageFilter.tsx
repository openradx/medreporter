import { Loader, Select } from "@mantine/core"
import { useFilter } from "~/contexts/FilterContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"

export const LanguageFilter = () => {
  const { t } = useSiteTranslation()
  const filter = useFilter()
  const { isPending, data, error } = trpc.templates.getTemplateLanguages.useQuery()

  return (
    <Select
      label={t("LanguageFilter.inputLabel")}
      placeholder={t("LanguageFilter.inputPlaceholder")}
      value={filter.language === "" ? null : filter.language}
      onChange={(value) => filter.setLanguage(value ?? "")}
      data={(data ?? []).map((language) => ({
        value: language,
        label: t(`languages.${language}`),
      }))}
      searchable
      clearable
      allowDeselect
      rightSection={isPending ? <Loader size="xs" /> : null}
      error={error?.message}
    />
  )
}
