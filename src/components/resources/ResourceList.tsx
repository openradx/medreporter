import { Anchor, Card, Center, Pagination, Stack, Text } from "@mantine/core"
import { ResourceType } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/router"
import { Route } from "nextjs-routes"
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
    siteLanguage: currentSiteLanguage,
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

  const totalPages = Math.ceil(data.count / ITEMS_PER_PAGE)

  const getRoute = (username: string, resourceName: string): Route => {
    switch (resourceType) {
      case "FIGURE": {
        return {
          pathname: "/figures/[username]/[figureName]",
          query: { username, figureName: resourceName },
        }
      }
      case "MODULE": {
        return {
          pathname: "/modules/[username]/[moduleName]",
          query: { username, moduleName: resourceName },
        }
      }
      default: {
        throw new Error(`Invalid resource type: ${resourceType}`)
      }
    }
  }

  return (
    <Stack>
      {data.resources.length === 0 && <Text>{t("general.miscNoData")}</Text>}
      {data.resources.length > 0 && (
        <Stack>
          {data.resources.map((resource) => (
            <Card key={resource.id} p="xs" withBorder>
              <Link
                href={getRoute(resource.author.username!, resource.name)}
                passHref
                legacyBehavior
              >
                <Anchor weight={500}>{resource.title}</Anchor>
              </Link>
            </Card>
          ))}
        </Stack>
      )}
      <Center>
        {totalPages > 1 && (
          <Pagination
            value={activePage}
            total={totalPages}
            onChange={(page) => router.push({ query: { page: String(page) } })}
          />
        )}
      </Center>
    </Stack>
  )
}
