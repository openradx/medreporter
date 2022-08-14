import { Stack } from "@mantine/core"
import { FilterInput } from "../../core/components/common/FilterInput"
import { FilterProvider } from "../../core/components/common/FilterProvider"
import { SuspenseLoader } from "../../core/components/common/SuspenseLoader"
import { useSiteTranslation } from "../../core/hooks/useSiteTranslation"
import { UserList } from "./UserList"

export const UsersManager = () => {
  const { t } = useSiteTranslation()

  return (
    <FilterProvider>
      <Stack>
        <FilterInput label={t("UsersManager.filterUsers")} />
        <SuspenseLoader>
          <UserList />
        </SuspenseLoader>
      </Stack>
    </FilterProvider>
  )
}
