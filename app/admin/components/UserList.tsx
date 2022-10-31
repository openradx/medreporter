import { usePaginatedQuery } from "@blitzjs/rpc"
import { Group, Pagination, ScrollArea, Stack, Table, Text } from "@mantine/core"
import { useRouter } from "next/router"
import { useDebounce } from "use-debounce"
import { useFilter } from "app/core/contexts/FilterContext"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import getUsers from "../queries/getUsers"
import { AddUserButton } from "./AddUserButton"
import { DeleteUserButton } from "./DeleteUserButton"
import { EditUserButton } from "./EditUserButton"

const ITEMS_PER_PAGE = 50

export const UserList = () => {
  const { t } = useSiteTranslation()
  const router = useRouter()
  const activePage = Number(router.query.page) || 1
  const { filter } = useFilter()
  const [filterDebounced] = useDebounce(filter.trim(), 500)
  const [{ users, count }] = usePaginatedQuery(getUsers, {
    filter: filterDebounced,
    skip: ITEMS_PER_PAGE * (activePage - 1),
    take: ITEMS_PER_PAGE,
  })

  return (
    <Stack>
      {users.length === 0 && <Text>{t("general.miscNoData")}</Text>}
      {users.length > 0 && (
        <ScrollArea>
          <Table sx={{ minWidth: 800 }} verticalSpacing="md">
            <tbody>
              {users.map((user) => (
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
        {users.length > 0 && (
          <Pagination
            page={activePage}
            total={Math.ceil(count / ITEMS_PER_PAGE)}
            onChange={(page) => router.push({ query: { page } })}
          />
        )}
      </Group>
    </Stack>
  )
}
