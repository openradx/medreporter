import { Group, Pagination, Stack, Text } from "@mantine/core"
import { useRouter } from "next/router"
import { useDebounce } from "use-debounce"
import { useFilter } from "~/contexts/FilterContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"
import { DataLoader } from "../common/DataLoader"
import { QueryError } from "../common/QueryError"
import { TemplateItem } from "./TemplateItem"

const ITEMS_PER_PAGE = 15

export const TemplateList = () => {
  const { t } = useSiteTranslation()
  const router = useRouter()
  const activePage = Number(router.query.page) || 1
  const { filter } = useFilter()
  const [filterDebounced] = useDebounce(filter.trim(), 500)
  const { data, error, status } = trpc.template.getTemplates.useQuery({
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
      {!data?.templates.length && <Text>{t("general.miscNoData")}</Text>}
      {data?.templates.length &&
        data.templates.map((template) => (
          <TemplateItem
            username={template.author.username!}
            slug={template.slug}
            language={template.language}
            title={template.title}
            description={template.description}
            categories={template.categories.map((category) => category.key)}
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
  )
}
