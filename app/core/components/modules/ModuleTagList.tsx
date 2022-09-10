import { useQuery } from "@blitzjs/rpc"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import getModuleTags from "app/core/queries/getModuleTags"
import { TagList } from "../common/TagList"

export const ModuleTagList = () => {
  const { language } = useSiteTranslation().i18n
  const [{ tags }] = useQuery(getModuleTags, { language })
  return <TagList tags={tags.map((tag) => tag.label)} />
}
