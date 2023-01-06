import { Button, Group, Pagination, ScrollArea, Stack, Table, Text } from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/router"
import { useDebounce } from "use-debounce"
import { useFilter } from "~/contexts/FilterContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { useUser } from "~/hooks/useUser"
import { trpc } from "~/utils/trpc"
import { DataLoader } from "../common/DataLoader"
import { QueryError } from "../common/QueryError"

const ITEMS_PER_PAGE = 15

export const ModuleList = () => {
  const { t, currentSiteLanguage } = useSiteTranslation()
  const router = useRouter()
  const activePage = Number(router.query.page) || 1
  const { filter } = useFilter()
  const [filterDebounced] = useDebounce(filter.trim(), 500)
  const user = useUser()

  // It is more of a workaround as we can't query the modules directly as we can't filter and
  // sort by a related field (the translation then), see
  // https://github.com/prisma/prisma/issues/5837
  const { data, error, status } = trpc.common.getTranslatedModules.useQuery({
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
      {!data?.modules.length && <Text>{t("general.miscNoData")}</Text>}
      {data?.modules.length && (
        <ScrollArea>
          <Table verticalSpacing="md">
            <tbody>
              {data.modules.map((module) => (
                <tr key={module.id}>
                  <td>{module.title}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      )}
      <Group position="apart">
        {!user ? (
          <div />
        ) : (
          <Link href="/modules/new" passHref legacyBehavior>
            <Button component="a" color="green">
              {t("ModuleList.buttonNewModule")}
            </Button>
          </Link>
        )}
        {data?.modules.length && (
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
