import { useLingui } from "@lingui/react/macro"
import { Select, Loader } from "@mantine/core"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { useFilter } from "~/contexts/FilterContext"
import { trpc } from "~/utils/trpc"

export const UserFilter = () => {
  const { t } = useLingui()
  const filter = useFilter()
  const [prefix, setPrefix] = useState("")
  const [prefixDebounced] = useDebounce(prefix, 500)
  const { isPending, data, error } = trpc.users.getUsernames.useQuery({ prefix: prefixDebounced })

  return (
    <Select
      label={t`Author`}
      placeholder={t`Filter by username of the author`}
      searchValue={prefix}
      onSearchChange={(value) => setPrefix(value)}
      data={data?.users.map((user) => user.username!) ?? []}
      value={filter.username === "" ? null : filter.username}
      onChange={(value) => filter.setUsername(value ?? "")}
      searchable
      clearable
      allowDeselect
      rightSection={isPending ? <Loader size="xs" /> : null}
      error={error?.message}
    />
  )
}
