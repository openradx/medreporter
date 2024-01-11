import { Flex, ScrollArea, Stack, Text } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PanelToolbar } from "../template/PanelToolbar"
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
    <Flex component="form" pos="relative" h="100%" direction="column">
      <PanelToolbar title={t("MenuPanel.components")} />
      <ScrollArea h="100%">
        <Stack gap="xs" p="xs">
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
      </ScrollArea>
    </Flex>
  )
}
