import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NavbarActions } from "../common/NavbarActions"
import { AddResourceButton } from "../resources/AddResourceButton"
import { ResourcesAndCategories } from "../resources/ResourcesAndCategories"

export const ModulesAndCategories = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <NavbarActions>
        <AddResourceButton
          route={{ pathname: "/modules/new" }}
          label={t("ModulesAndCategories.buttonNewModule")}
        />
      </NavbarActions>
      <ResourcesAndCategories resourceType="MODULE" />
    </>
  )
}
