import { ScrollArea, Stack, Title } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanFieldMenuItem } from "./menuItems/BooleanFieldMenuItem"
import { FreeTextFieldMenuItem } from "./menuItems/FreeTextFieldMenuItem"
import { GroupMenuItem } from "./menuItems/GroupMenuItem"
import { MultipleChoiceFieldMenuItem } from "./menuItems/MultipleChoiceFieldMenuItem"
import { NumberFieldMenuItem } from "./menuItems/NumberFieldMenuItem"
import { ParagraphMenuItem } from "./menuItems/ParagraphMenuItem"
import { SingleChoiceFieldMenuItem } from "./menuItems/SingleChoiceFieldMenuItem"
import { StatementMenuItem } from "./menuItems/StatementMenuItem"

export const MenuPanel = () => {
  const { t } = useSiteTranslation()

  return (
    <ScrollArea offsetScrollbars h="100%" style={{ flexGrow: 1 }}>
      <Stack pl="xs">
        <Title order={4} c="dimmed">
          {t("MenuPanel.components")}
        </Title>
        <Stack gap="xs">
          <GroupMenuItem label={t("MenuPanel.groupLabel")} />
          <Title order={5} c="dimmed">
            {t("MenuPanel.fields")}
          </Title>
          <BooleanFieldMenuItem label={t("MenuPanel.booleanFieldLabel")} />
          <FreeTextFieldMenuItem label={t("MenuPanel.freeTextFieldLabel")} />
          <NumberFieldMenuItem label={t("MenuPanel.numberFieldLabel")} />
          <SingleChoiceFieldMenuItem label={t("MenuPanel.singleChoiceFieldLabel")} />
          <MultipleChoiceFieldMenuItem label={t("MenuPanel.multipleChoiceFieldLabel")} />
          <Title order={5} c="dimmed">
            {t("MenuPanel.report")}
          </Title>
          <ParagraphMenuItem label={t("MenuPanel.paragraphLabel")} />
          <StatementMenuItem label={t("MenuPanel.statementLabel")} />
          <Title order={5} c="dimmed">
            {t("MenuPanel.others")}
          </Title>
        </Stack>
      </Stack>
    </ScrollArea>
  )
}
