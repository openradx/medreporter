import { Stack, Title } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanFieldMenuItem } from "./BooleanFieldMenuItem"
import { FreeTextFieldMenuItem } from "./FreeTextFieldMenuItem"
import { GroupMenuItem } from "./GroupMenuItem"
import { MultipleChoiceFieldMenuItem } from "./MultipleChoiceFieldMenuItem"
import { NumberFieldMenuItem } from "./NumberFieldMenuItem"
import { SingleChoiceFieldMenuItem } from "./SingleChoiceFieldMenuItem"

export const DesignerMenu = () => {
  const { t } = useSiteTranslation()

  return (
    <Stack>
      <Title order={4} c="dimmed">
        {t("EditorMenu.components")}
      </Title>
      <Stack gap="xs">
        <GroupMenuItem label={t("EditorMenu.groupLabel")} />
        <Title order={5} c="dimmed">
          {t("EditorMenu.fields")}
        </Title>
        <BooleanFieldMenuItem label={t("EditorMenu.booleanFieldLabel")} />
        <FreeTextFieldMenuItem label={t("EditorMenu.freeTextFieldLabel")} />
        <NumberFieldMenuItem label={t("EditorMenu.numberFieldLabel")} />
        <SingleChoiceFieldMenuItem label={t("EditorMenu.singleChoiceFieldLabel")} />
        <MultipleChoiceFieldMenuItem label={t("EditorMenu.multipleChoiceFieldLabel")} />
        <Title order={5} c="dimmed">
          {t("EditorMenu.report")}
        </Title>
        <Title order={5} c="dimmed">
          {t("EditorMenu.others")}
        </Title>
      </Stack>
    </Stack>
  )
}
