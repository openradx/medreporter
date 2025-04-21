import { useLingui } from "@lingui/react/macro"
import { Paper, Stack } from "@mantine/core"
import { PanelToolbar } from "../template/PanelToolbar"
import { CategoriesFilter } from "./CategoriesFilter"
import { ClearFiltersButton } from "./ClearFiltersButton"
import { LanguageFilter } from "./LanguageFilter"
import { TemplatesSorting } from "./TemplatesSorting"
import { UserFilter } from "./UserFilter"

export const TemplateFilters = () => {
  const { t } = useLingui()

  return (
    <Paper
      withBorder
      shadow="sm"
      display="flex"
      h="100%"
      w="100%"
      style={{ flexDirection: "column" }}
    >
      <PanelToolbar title={t`Filters`} actions={<ClearFiltersButton />} actionsPosition="right" />
      <Stack p="xs" pb="xl" gap="xs">
        <LanguageFilter />
        <CategoriesFilter />
        <UserFilter />
      </Stack>
      <PanelToolbar title={t`Sorting`} />
      <Stack p="xs" gap="xs">
        <TemplatesSorting />
      </Stack>
    </Paper>
  )
}
