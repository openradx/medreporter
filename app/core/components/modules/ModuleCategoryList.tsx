import { useQuery } from "@blitzjs/rpc"
import { useI18nSite } from "app/core/contexts/I18nSiteContext"
import getCategories from "app/core/queries/getCategories"
import { CategoryList } from "../common/CategoryList"

export const ModuleCategoryList = () => {
  const { currentSiteLanguage } = useI18nSite()
  const [{ categories }] = useQuery(getCategories, {
    language: currentSiteLanguage,
    usedByModule: true,
  })
  return <CategoryList categories={categories} />
}
