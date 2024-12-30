import { Paper, Stack } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PanelToolbar } from "../template/PanelToolbar"
import { LanguageFilter } from "./LanguageFilter"

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
      <PanelToolbar title={t("TemplateFilters.title")} />
      <Stack p="xs" gap="xs">
        <LanguageFilter />
      </Stack>
    </Paper>
  )
}