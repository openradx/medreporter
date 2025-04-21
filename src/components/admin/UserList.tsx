import { Trans } from "@lingui/react/macro"
import { Group, Pagination, ScrollArea, Stack, Table, Text } from "@mantine/core"
import { useRouter } from "next/router"
import { useDebounce } from "use-debounce"
import { useFilter } from "~/contexts/FilterContext"
import { trpc } from "~/utils/trpc"
import { DataLoader } from "../common/DataLoader"
import { QueryError } from "../common/QueryError"
import { AddUserButton } from "./AddUserButton"
import { DeleteUserButton } from "./DeleteUserButton"
import { EditUserButton } from "./EditUserButton"

const ITEMS_PER_PAGE = 15

export const UserList = () => {
  const router = useRouter()
  const activePage = Number(router.query.page) || 1
  const { search: filter } = useFilter()
  const [filterDebounced] = useDebounce(filter.trim(), 500)
  const { isPending, isError, data, error } = trpc.admin.getUsers.useQuery({
    filter: filterDebounced,
    skip: ITEMS_PER_PAGE * (activePage - 1),
    take: ITEMS_PER_PAGE,
  })

  if (isPending) {
    return <DataLoader />
  }

  if (isError) {
    return <QueryError message={error.message} />
  }

  return (
    <Stack h="90%" mih={0}>
      {!data?.users.length && (
        <Text>
          <Trans>No data available</Trans>
        </Text>
      )}
      {data?.users.length && (
        <ScrollArea>
          <Table miw={800}>
            <Table.Tbody>
              {data.users.map((user) => (
                <Table.Tr key={user.id}>
                  <Table.Td>{user.username}</Table.Td>
                  <Table.Td>{user.email}</Table.Td>
                  <Table.Td>{user.role}</Table.Td>
                  <Table.Td>
                    <Group gap={0} style={{ flexWrap: "nowrap", justifyContent: "flex-end" }}>
                      <EditUserButton user={user} />
                      <DeleteUserButton user={user} />
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      )}
      <Group justify="space-between">
        <AddUserButton />
        {data?.users.length && (
          <Pagination
            value={activePage}
            total={Math.ceil(data.count / ITEMS_PER_PAGE)}
            onChange={(value) => router.push({ query: { page: String(value) } })}
          />
        )}
      </Group>
    </Stack>
  )
}
