import { Select, Loader } from "@mantine/core"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { useFilter } from "~/contexts/FilterContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"

export const UserFilter = () => {
  const { t } = useSiteTranslation()
  const filter = useFilter()
  const [prefix, setPrefix] = useState("")
  const [prefixDebounced] = useDebounce(prefix, 500)
  const { isPending, data, error } = trpc.users.getUsernames.useQuery({ prefix: prefixDebounced })

  return (
    <Select
      label={t("UserFilter.inputLabel")}
      placeholder={t("UserFilter.inputPlaceholder")}
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
