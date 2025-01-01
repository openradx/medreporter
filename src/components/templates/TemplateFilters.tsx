import { Paper, Stack } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PanelToolbar } from "../template/PanelToolbar"
import { CategoriesFilter } from "./CategoriesFilter"
import { LanguageFilter } from "./LanguageFilter"
import { TemplatesSorting } from "./TemplatesSorting"
import { UserFilter } from "./UserFilter"

export const TemplateFilters = () => {
  const { t } = useSiteTranslation()

  return (
    <Paper
      withBorder
      shadow="sm"
      display="flex"
      h="100%"
      w="100%"
      style={{ flexDirection: "column" }}
    >
      <PanelToolbar title={t("TemplateFilters.filtersTitle")} />
      <Stack p="xs" pb="xl" gap="xs">
        <LanguageFilter />
        <CategoriesFilter />
        <UserFilter />
      </Stack>
      <PanelToolbar title={t("TemplateFilters.sortingTitle")} />
      <Stack p="xs" gap="xs">
        <TemplatesSorting />
      </Stack>
    </Paper>
  )
}
