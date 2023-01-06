import { Group, Pagination, ScrollArea, Stack, Table, Text } from "@mantine/core"
import { UserRole } from "@prisma/client"
import { useRouter } from "next/router"
import { useDebounce } from "use-debounce"
import { useFilter } from "~/contexts/FilterContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
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
  const { t } = useSiteTranslation()
  const router = useRouter()
  const activePage = Number(router.query.page) || 1
  const { filter } = useFilter()
  const [filterDebounced] = useDebounce(filter.trim(), 500)
  const { data, error, status } = trpc.admin.getInstitutes.useQuery({
    filter: filterDebounced,
    skip: ITEMS_PER_PAGE * (activePage - 1),
    take: ITEMS_PER_PAGE,
  })

  const user = useUser()
  const canAddInstitute = user && hasRole(user, [UserRole.SUPERADMIN, UserRole.ORGANIZER])

  if (status === "loading") {
    return <DataLoader />
  }

  if (status === "error") {
    return <QueryError message={error.message} />
  }

  return (
    <Stack>
      {!data?.institutes.length && <Text>{t("general.miscNoData")}</Text>}
      {data?.institutes.length && (
        <ScrollArea>
          <Table sx={{ minWidth: 800 }} verticalSpacing="md">
            <tbody>
              {data.institutes.map((institute) => (
                <tr key={institute.id}>
                  <td>{institute.name}</td>
                  <td>
                    <Group spacing={0} position="right">
                      <ManageMembershipsButton institute={institute} />
                      <EditInstituteButton institute={institute} />
                      <DeleteInstituteButton institute={institute} />
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      )}
      <Group position="apart">
        {canAddInstitute ? <AddInstituteButton /> : <div />}
        {data?.institutes.length && (
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
