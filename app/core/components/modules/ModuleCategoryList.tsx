import { useQuery } from "@blitzjs/rpc"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import getCategories from "app/core/queries/getCategories"
import { CategoryList } from "../common/CategoryList"

export const ModuleCategoryList = () => {
  const { language } = useSiteTranslation().i18n
  const [{ categories }] = useQuery(getCategories, { language, usedByModule: true })
  return <CategoryList categories={categories} />
}
