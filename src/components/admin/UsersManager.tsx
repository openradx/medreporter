import { Stack } from "@mantine/core"
import { FilterInput } from "~/components/common/FilterInput"
import { FilterProvider } from "~/components/common/FilterProvider"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { UserList } from "./UserList"

export const UsersManager = () => {
  const { t } = useSiteTranslation()

  return (
    <FilterProvider>
      <Stack>
        <FilterInput label={t("UsersManager.inputLabelFilterUsers")} />
        <UserList />
      </Stack>
    </FilterProvider>
  )
}
