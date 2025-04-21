import { Trans, useLingui } from "@lingui/react/macro"
import { Flex, ScrollArea, Stack, Text } from "@mantine/core"
import { PanelToolbar } from "../template/PanelToolbar"
import { DateFieldMenuItem } from "./menuItems/DateFieldMenuItem"
import { FindingFieldMenuItem } from "./menuItems/FindingFieldMenuItem"
import { FreeTextFieldMenuItem } from "./menuItems/FreeTextFieldMenuItem"
import { GroupMenuItem } from "./menuItems/GroupMenuItem"
import { HintMenuItem } from "./menuItems/HintMenuItem"
import { MeasurementsMenuItem } from "./menuItems/MeasurementsMenuItem"
import { MeasurementsOutputMenuItem } from "./menuItems/MeasurementsOutputMenuItem"
import { MultipleChoiceFieldMenuItem } from "./menuItems/MultipleChoiceFieldMenuItem"
import { NumberFieldMenuItem } from "./menuItems/NumberFieldMenuItem"
import { ParagraphMenuItem } from "./menuItems/ParagraphMenuItem"
import { SingleChoiceFieldMenuItem } from "./menuItems/SingleChoiceFieldMenuItem"
import { StatementMenuItem } from "./menuItems/StatementMenuItem"
import { TimeFieldMenuItem } from "./menuItems/TimeFieldMenuItem"

export const MenuPanel = () => {
  const { t } = useLingui()

  return (
    <Flex component="form" pos="relative" h="100%" direction="column">
      <PanelToolbar title={t`Components`} />
      <ScrollArea h="100%">
        <Stack gap="xs" p="xs">
          <Text c="dimmed">
            <Trans>Strucuture</Trans>
          </Text>
          <GroupMenuItem label={t`Group`} />
          <FindingFieldMenuItem label={t`Finding`} />
          <DateFieldMenuItem label={t`Date`} />
          <TimeFieldMenuItem label={t`Time`} />
          <FreeTextFieldMenuItem label={t`Free text`} />
          <NumberFieldMenuItem label={t`Number`} />
          <SingleChoiceFieldMenuItem label={t`Single choice`} />
          <MultipleChoiceFieldMenuItem label={t`Multiple choice`} />
          <MeasurementsMenuItem label={t`Measurements`} />
          <Text c="dimmed">
            <Trans>Report</Trans>
          </Text>
          <ParagraphMenuItem label={t`Paragraph`} />
          <StatementMenuItem label={t`Statement`} />
          <MeasurementsOutputMenuItem label={t`Measurements output`} />
          <Text c="dimmed">{t`Others`}</Text>
          <HintMenuItem label={t`Hint`} />
        </Stack>
      </ScrollArea>
    </Flex>
  )
}
