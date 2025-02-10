import { useRouter } from "next/router"

export const useIsDesigning = () => {
  const router = useRouter()
  const { pathname, query } = router

  const isEditTemplateQuery = typeof query.edit === "string" && query.edit.toLowerCase() === "true"
  const isNewTemplatePath = pathname === "/templates/new"

  if (isEditTemplateQuery || isNewTemplatePath) {
    return true
  }
  return false
}
