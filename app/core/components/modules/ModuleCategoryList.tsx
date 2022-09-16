import { useQuery } from "@blitzjs/rpc"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import getModuleCategories from "app/core/queries/getModuleCategories"
import { CategoryList } from "../common/CategoryList"

export const ModuleCategoryList = () => {
  const { language } = useSiteTranslation().i18n
  const [{ categories }] = useQuery(getModuleCategories, { language, filter: "" })
  return <CategoryList categories={categories} />
}
