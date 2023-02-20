import { ResourceType } from "@prisma/client"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"
import { CategoryList } from "../common/CategoryList"
import { DataLoader } from "../common/DataLoader"
import { QueryError } from "../common/QueryError"

interface ResourceCategoryListProps {
  resourceType: ResourceType
}

export const ResourceCategoryList = ({ resourceType }: ResourceCategoryListProps) => {
  const { currentSiteLanguage } = useSiteTranslation()
  const { data, error, status } = trpc.categories.getCategories.useQuery({
    language: currentSiteLanguage,
    type: resourceType,
  })

  if (status === "loading") {
    return <DataLoader />
  }

  if (status === "error") {
    return <QueryError message={error.message} />
  }

  return <CategoryList categories={data?.categories ?? []} />
}
