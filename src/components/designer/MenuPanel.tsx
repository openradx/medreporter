import { ScrollArea, Stack, Text, Title } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanFieldMenuItem } from "./menuItems/BooleanFieldMenuItem"
import { FreeTextFieldMenuItem } from "./menuItems/FreeTextFieldMenuItem"
import { GroupMenuItem } from "./menuItems/GroupMenuItem"
import { HintMenuItem } from "./menuItems/HintMenuItem"
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
          <Text c="dimmed">{t("MenuPanel.structure")}</Text>
          <GroupMenuItem label={t("MenuPanel.groupLabel")} />
          <BooleanFieldMenuItem label={t("MenuPanel.booleanFieldLabel")} />
          <FreeTextFieldMenuItem label={t("MenuPanel.freeTextFieldLabel")} />
          <NumberFieldMenuItem label={t("MenuPanel.numberFieldLabel")} />
          <SingleChoiceFieldMenuItem label={t("MenuPanel.singleChoiceFieldLabel")} />
          <MultipleChoiceFieldMenuItem label={t("MenuPanel.multipleChoiceFieldLabel")} />
          <Text c="dimmed">{t("MenuPanel.report")}</Text>
          <ParagraphMenuItem label={t("MenuPanel.paragraphLabel")} />
          <StatementMenuItem label={t("MenuPanel.statementLabel")} />
          <Text c="dimmed">{t("MenuPanel.others")}</Text>
          <HintMenuItem label={t("MenuPanel.hintLabel")} />
        </Stack>
      </Stack>
    </ScrollArea>
  )
}
