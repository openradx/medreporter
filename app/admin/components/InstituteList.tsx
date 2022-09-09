import { usePaginatedQuery } from "@blitzjs/rpc"
import { Pagination, Stack, ScrollArea, Table, Text, Group } from "@mantine/core"
import { useRouter } from "next/router"
import { useDebounce } from "use-debounce"
import { UserRole } from "db"
import { useFilter } from "app/core/contexts/FilterContext"
import { useAppSession } from "app/core/hooks/useAppSession"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import getInstitutes from "../queries/getInstitutes"
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
  const [{ institutes, count }] = usePaginatedQuery(getInstitutes, {
    where: { name: { contains: filterDebounced, mode: "insensitive" } },
    orderBy: { name: "asc" },
    skip: ITEMS_PER_PAGE * (activePage - 1),
    take: ITEMS_PER_PAGE,
  })

  const session = useAppSession()
  const canAddInstitute =
    session.roles?.includes(UserRole.SUPERADMIN) || session.roles?.includes(UserRole.ORGANIZER)

  return (
    <Stack>
      {institutes.length === 0 && <Text>{t("general.miscNoData")}</Text>}
      {institutes.length > 0 && (
        <ScrollArea>
          <Table sx={{ minWidth: 800 }} verticalSpacing="md">
            <tbody>
              {institutes.map((institute) => (
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
        {institutes.length > 0 && (
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
