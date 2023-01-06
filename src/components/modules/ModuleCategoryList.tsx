import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"
import { CategoryList } from "../common/CategoryList"
import { DataLoader } from "../common/DataLoader"
import { QueryError } from "../common/QueryError"

export const ModuleCategoryList = () => {
  const { currentSiteLanguage } = useSiteTranslation()
  const { data, error, status } = trpc.common.getCategories.useQuery({
    language: currentSiteLanguage,
    usedByModule: true,
  })

  if (status === "loading") {
    return <DataLoader />
  }

  if (status === "error") {
    return <QueryError message={error.message} />
  }

  return <CategoryList categories={data?.categories ?? []} />
}
