import { Stack, Title } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanFieldMenuItem } from "./BooleanFieldMenuItem"
import { GroupMenuItem } from "./GroupMenuItem"

export const DesignerMenu = () => {
  const { t } = useSiteTranslation()

  return (
    <Stack>
      <Title order={5} c="dimmed">
        Components
      </Title>
      <Stack gap="xs">
        <GroupMenuItem label={t("EditorMenu.groupLabel")} />
        <BooleanFieldMenuItem label={t("EditorMenu.booleanFieldLabel")} />
      </Stack>
    </Stack>
  )
}
