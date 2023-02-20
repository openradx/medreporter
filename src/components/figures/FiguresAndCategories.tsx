import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NavbarActions } from "../common/NavbarActions"
import { AddResourceButton } from "../resources/AddResourceButton"
import { ResourcesAndCategories } from "../resources/ResourcesAndCategories"

export const FiguresAndCategories = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <NavbarActions>
        <AddResourceButton
          route={{ pathname: "/figures/new" }}
          label={t("FiguresAndCategories.addFigureButtonLabel")}
        />
      </NavbarActions>
      <ResourcesAndCategories
        resourceType="FIGURE"
        filterInputLabel={t("FiguresAndCategories.filterInputLabel")}
      />
    </>
  )
}
