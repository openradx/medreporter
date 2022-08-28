import { Routes } from "@blitzjs/next"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { Button, Group, Pagination, Stack, Table, Text } from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { useDebounce } from "use-debounce"
import { useFilter } from "app/core/contexts/FilterContext"
import { useAppSession } from "app/core/hooks/useAppSession"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import getTranslatedModules, { TranslatedModule } from "app/core/queries/getTranslatedModules"
import { createFilterObject } from "app/core/utils/filterUtils"
import { createWhereClause } from "app/core/utils/searchUtils"

const ITEMS_PER_PAGE = 50

interface ModuleListProps {
  username?: string
  onModuleSelected?: (module: TranslatedModule) => void
}

export const ModuleList = ({ username, onModuleSelected }: ModuleListProps) => {
  const { t, i18n } = useSiteTranslation()
  const router = useRouter()
  const activePage = Number(router.query.page) || 1
  const { filter } = useFilter()
  const [filterDebounced] = useDebounce(filter.trim(), 500)
  const filterObject = useMemo(
    () => createFilterObject(filterDebounced, ["title", "description", "tag", "language"]),
    [filterDebounced]
  )
  const whereClause = useMemo(() => createWhereClause(filterObject), [filterObject])
  const [{ modules, count }] = usePaginatedQuery(getTranslatedModules, {
    where: {
      module: { author: { username } },
      OR: [
        {
          module: { languages: { has: i18n.language } },
          language: i18n.language,
          ...whereClause,
        },
        {
          module: { NOT: { languages: { has: i18n.language } } },
          default: true,
          ...whereClause,
        },
      ],
    },
    orderBy: { title: "asc" },
    skip: ITEMS_PER_PAGE * (activePage - 1),
    take: ITEMS_PER_PAGE,
  })

  const { userId } = useAppSession()

  return (
    <Stack spacing={0.5} sx={{ minHeight: 0, height: "100%", overflowY: "auto" }}>
      {modules.length === 0 && <Text>{t("general.misc.noData")}</Text>}
      {modules.length > 0 && (
        <Table verticalSpacing="md">
          <tbody>
            {modules.map((module) => (
              <tr key={module.id}>
                <td>{module.title}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Group position="apart">
        {userId === null ? (
          <div />
        ) : (
          <Link href={Routes.NewModulePage()} passHref>
            <Button component="a">{t("ModuleList.button_create_new_module")}</Button>
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
