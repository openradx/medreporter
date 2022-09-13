import { Routes } from "@blitzjs/next"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { Button, Group, Pagination, ScrollArea, Stack, Table, Text } from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/router"
import { useDebounce } from "use-debounce"
import { useFilter } from "app/core/contexts/FilterContext"
import { useAppSession } from "app/core/hooks/useAppSession"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import getTranslatedModules from "app/core/queries/getTranslatedModules"

const ITEMS_PER_PAGE = 50

export const ModuleList = () => {
  const { t, i18n } = useSiteTranslation()
  const router = useRouter()
  const activePage = Number(router.query.page) || 1
  const { filter } = useFilter()
  const [filterDebounced] = useDebounce(filter.trim(), 500)

  // It is more of a workaround as we can't query the modules directly as we can't filter and
  // sort by a related field (the translation then), see
  // https://github.com/prisma/prisma/issues/5837
  const [{ modules, count }] = usePaginatedQuery(getTranslatedModules, {
    language: i18n.language,
    filter: filterDebounced,
    skip: ITEMS_PER_PAGE * (activePage - 1),
    take: ITEMS_PER_PAGE,
  })

  const { userId } = useAppSession()

  return (
    <Stack>
      {modules.length === 0 && <Text>{t("general.miscNoData")}</Text>}
      {modules.length > 0 && (
        <ScrollArea>
          <Table verticalSpacing="md">
            <tbody>
              {modules.map((module) => (
                <tr key={module.id}>
                  <td>{module.title}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      )}
      <Group position="apart">
        {userId === null ? (
          <div />
        ) : (
          <Link href={Routes.NewModulePage()} passHref>
            <Button component="a">{t("ModuleList.buttonCreateNewModule")}</Button>
          </Link>
        )}
        {modules.length > 0 && (
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
