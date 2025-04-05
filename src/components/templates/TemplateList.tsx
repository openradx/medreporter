import { Group, Pagination, ScrollArea, Stack, Text } from "@mantine/core"
import { useRouter } from "next/router"
import { useDebounce } from "use-debounce"
import { useFilter } from "~/contexts/FilterContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"
import { DataLoader } from "../common/DataLoader"
import { QueryError } from "../common/QueryError"
import { TemplateItem } from "./TemplateItem"
import classes from "./TemplateList.module.css"

const ITEMS_PER_PAGE = 15

export const TemplateList = () => {
  const { t } = useSiteTranslation()
  const router = useRouter()
  const activePage = Number(router.query.page) || 1
  const { categories, language, search, username, sorting } = useFilter()
  const [searchDebounced] = useDebounce(search.trim(), 500)
  const { isPending, isError, data, error } = trpc.templates.getTemplates.useQuery({
    categories,
    language,
    search: searchDebounced,
    username,
    sorting,
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
    <ScrollArea h="100%" scrollHideDelay={0} className={classes.templateList}>
      <Stack gap="xs">
        {!data?.templates.length && <Text>{t("general.miscNoData")}</Text>}
        {data?.templates.length &&
          data.templates.map((template) => (
            <TemplateItem
              key={template.slug}
              username={template.author.username!}
              slug={template.slug}
              language={template.language}
              title={template.title}
              description={template.description}
              categories={template.categories.map((category) => category.key)}
              updatedAt={template.updatedAt}
            />
          ))}
        <Group justify="space-between">
          {data?.templates.length && (
            <Pagination
              value={activePage}
              total={Math.ceil(data.count / ITEMS_PER_PAGE)}
              onChange={(value) => router.push({ query: { page: String(value) } })}
            />
          )}
        </Group>
      </Stack>
    </ScrollArea>
  )
}
