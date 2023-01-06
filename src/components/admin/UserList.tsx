import { Group, Pagination, ScrollArea, Stack, Table, Text } from "@mantine/core"
import { useRouter } from "next/router"
import { useDebounce } from "use-debounce"
import { useFilter } from "~/contexts/FilterContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"
import { DataLoader } from "../common/DataLoader"
import { QueryError } from "../common/QueryError"
import { AddUserButton } from "./AddUserButton"
import { DeleteUserButton } from "./DeleteUserButton"
import { EditUserButton } from "./EditUserButton"

const ITEMS_PER_PAGE = 15

export const UserList = () => {
  const { t } = useSiteTranslation()
  const router = useRouter()
  const activePage = Number(router.query.page) || 1
  const { filter } = useFilter()
  const [filterDebounced] = useDebounce(filter.trim(), 500)
  const { data, error, status } = trpc.admin.getUsers.useQuery({
    filter: filterDebounced,
    skip: ITEMS_PER_PAGE * (activePage - 1),
    take: ITEMS_PER_PAGE,
  })

  if (status === "loading") {
    return <DataLoader />
  }

  if (status === "error") {
    return <QueryError message={error.message} />
  }

  return (
    <Stack>
      {!data?.users.length && <Text>{t("general.miscNoData")}</Text>}
      {data?.users.length && (
        <ScrollArea>
          <Table sx={{ minWidth: 800 }} verticalSpacing="md">
            <tbody>
              {data.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Group spacing={0} position="right">
                      <EditUserButton user={user} />
                      <DeleteUserButton user={user} />
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      )}
      <Group position="apart">
        <AddUserButton />
        {data?.users.length && (
          <Pagination
            page={activePage}
            total={Math.ceil(data.count / ITEMS_PER_PAGE)}
            onChange={(page) => router.push({ query: { page: String(page) } })}
          />
        )}
      </Group>
    </Stack>
  )
}
