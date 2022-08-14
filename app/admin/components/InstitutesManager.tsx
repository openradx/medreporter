import { Stack } from "@mantine/core"
import { FilterInput } from "app/core/components/common/FilterInput"
import { FilterProvider } from "app/core/components/common/FilterProvider"
import { SuspenseLoader } from "app/core/components/common/SuspenseLoader"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { InstituteList } from "./InstituteList"

export const InstitutesManager = () => {
  const { t } = useSiteTranslation()

  return (
    <FilterProvider>
      <Stack>
        <FilterInput label={t("InstitutesManager.filterInstitutes")} />
        <SuspenseLoader>
          <InstituteList />
        </SuspenseLoader>
      </Stack>
    </FilterProvider>
  )
}
