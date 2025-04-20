import { useLingui } from "@lingui/react/macro"
import { Stack } from "@mantine/core"
import { FilterInput } from "~/components/common/FilterInput"
import { FilterProvider } from "~/components/common/FilterProvider"
import { UserList } from "./UserList"

export const UsersManager = () => {
  const { t } = useLingui()

  return (
    <FilterProvider>
      <Stack h="95%" mih={0}>
        <FilterInput label={t`Filter users`} />
        <UserList />
      </Stack>
    </FilterProvider>
  )
}
