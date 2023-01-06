import { Stack } from "@mantine/core"
import { FilterInput } from "~/components/common/FilterInput"
import { FilterProvider } from "~/components/common/FilterProvider"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { InstituteList } from "./InstituteList"

export const InstitutesManager = () => {
  const { t } = useSiteTranslation()

  return (
    <FilterProvider>
      <Stack>
        <FilterInput label={t("InstitutesManager.inputLabelFilterInstitutes")} />
        <InstituteList />
      </Stack>
    </FilterProvider>
  )
}
