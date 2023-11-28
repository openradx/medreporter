import { Card, Stack, Title } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanFieldMenuItem } from "./BooleanFieldMenuItem"
import { LayoutMenuItem } from "./LayoutMenuItem"

export const DesignerMenu = () => {
  const { t } = useSiteTranslation()

  return (
    <Stack>
      <Title order={5} color="dimmed">
        Components
      </Title>
      <Stack spacing="xs">
        <BooleanFieldMenuItem label={t("EditorMenu.booleanFieldLabel")} />
        <LayoutMenuItem label={t("EditorMenu.layoutLabel")} />
      </Stack>
    </Stack>
  )
}
