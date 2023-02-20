import { Group, Pagination, ScrollArea, Stack, Table, Text } from "@mantine/core"
import { ResourceType } from "@prisma/client"
import { useRouter } from "next/router"
import { useDebounce } from "use-debounce"
import { useFilter } from "~/contexts/FilterContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"
import { DataLoader } from "../common/DataLoader"
import { QueryError } from "../common/QueryError"

const ITEMS_PER_PAGE = 15

interface ResourceListProps {
  resourceType: ResourceType
}

export const ResourceList = ({ resourceType }: ResourceListProps) => {
  const { t, currentSiteLanguage } = useSiteTranslation()
  const router = useRouter()
  const activePage = Number(router.query.page) || 1
  const { filter } = useFilter()
  const [filterDebounced] = useDebounce(filter.trim(), 500)

  // It is more of a workaround as we can't query the modules directly as we can't filter and
  // sort by a related field (the translation then), see
  // https://github.com/prisma/prisma/issues/5837
  const { data, error, status } = trpc.resources.getTranslatedResources.useQuery({
    type: resourceType,
    language: currentSiteLanguage,
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
      {data?.resources.length === 0 && <Text>{t("general.miscNoData")}</Text>}
      {data?.resources.length > 0 && (
        <ScrollArea>
          <Table verticalSpacing="md">
            <tbody>
              {data.resources.map((module_) => (
                <tr key={module_.id}>
                  <td>{module_.title}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      )}
      <Group position="center">
        {data?.resources.length && (
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
