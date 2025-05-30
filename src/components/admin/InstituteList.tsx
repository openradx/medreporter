import { Trans } from "@lingui/react/macro"
import { Group, Pagination, ScrollArea, Stack, Table, Text } from "@mantine/core"
import { UserRole } from "@prisma/client"
import { useRouter } from "next/router"
import { useDebounce } from "use-debounce"
import { useFilter } from "~/contexts/FilterContext"
import { useUser } from "~/hooks/useUser"
import { hasRole } from "~/utils/authorization"
import { trpc } from "~/utils/trpc"
import { DataLoader } from "../common/DataLoader"
import { QueryError } from "../common/QueryError"
import { AddInstituteButton } from "./AddInstituteButton"
import { DeleteInstituteButton } from "./DeleteInstituteButton"
import { EditInstituteButton } from "./EditInstituteButton"
import { ManageMembershipsButton } from "./ManageMembershipsButton"

const ITEMS_PER_PAGE = 10

export const InstituteList = () => {
  const router = useRouter()
  const activePage = Number(router.query.page) || 1
  const { search: filter } = useFilter()
  const [filterDebounced] = useDebounce(filter.trim(), 500)
  const { isPending, isError, data, error } = trpc.admin.getInstitutes.useQuery({
    filter: filterDebounced,
    skip: ITEMS_PER_PAGE * (activePage - 1),
    take: ITEMS_PER_PAGE,
  })

  const user = useUser()
  const canAddInstitute = user && hasRole(user, [UserRole.SUPERUSER, UserRole.ORGANIZER])

  if (isPending) {
    return <DataLoader />
  }

  if (isError) {
    return <QueryError message={error.message} />
  }

  return (
    <Stack h="90%" mih={0}>
      {!data?.institutes.length && (
        <Text>
          <Trans>No data available</Trans>
        </Text>
      )}
      {data?.institutes.length && (
        <ScrollArea>
          <Table miw={500}>
            <Table.Tbody>
              {data.institutes.map((institute) => (
                <Table.Tr key={institute.id}>
                  <Table.Td>{institute.name}</Table.Td>
                  <Table.Td>
                    <Group gap={0} style={{ flexWrap: "nowrap", justifyContent: "flex-end" }}>
                      <ManageMembershipsButton institute={institute} />
                      <EditInstituteButton institute={institute} />
                      <DeleteInstituteButton institute={institute} />
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      )}
      <Group justify="space-between">
        {canAddInstitute ? <AddInstituteButton /> : <div />}
        {data?.institutes.length && (
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
