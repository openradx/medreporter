import { useQuery } from "@blitzjs/rpc"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import getCategories from "app/core/queries/getCategories"
import { CategoryList } from "../common/CategoryList"

export const ModuleCategoryList = () => {
  const { currentSiteLanguage } = useSiteTranslation()
  const [{ categories }] = useQuery(getCategories, {
    language: currentSiteLanguage,
    usedByModule: true,
  })
  return <CategoryList categories={categories} />
}
