import { useLingui as useLinguiLazy } from "@lingui/react"
import { useLingui as useLinguiMacro } from "@lingui/react/macro"
import { Loader, Select } from "@mantine/core"
import { LANGUAGES } from "~/constants/lazy-translations"
import { useFilter } from "~/contexts/FilterContext"
import { trpc } from "~/utils/trpc"

export const LanguageFilter = () => {
  const { t } = useLinguiMacro()
  const { _ } = useLinguiLazy()
  const filter = useFilter()
  const { isPending, data, error } = trpc.templates.getTemplateLanguages.useQuery()

  return (
    <Select
      label={t`Language`}
      placeholder={t`Filter by language`}
      value={filter.language === "" ? null : filter.language}
      onChange={(value) => filter.setLanguage(value ?? "")}
      data={(data ?? []).map((language) => ({
        value: language,
        // @ts-expect-error language is a string by next.js
        label: _(LANGUAGES[language]),
      }))}
      searchable
      clearable
      allowDeselect
      rightSection={isPending ? <Loader size="xs" /> : null}
      error={error?.message}
    />
  )
}
