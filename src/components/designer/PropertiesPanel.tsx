import { Button, CloseButton, Stack, ScrollArea, Flex } from "@mantine/core"
import invariant from "tiny-invariant"
import { match } from "ts-pattern"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { selectSelectedItem, setSelectedItem } from "~/state/designerSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { deleteNode, selectTemplate } from "~/state/templateSlice"
import { findNode } from "~/utils/designerUtils"
import { PanelToolbar } from "../template/PanelToolbar"
import { BooleanFieldPropertiesForm } from "./propertyForms/BooleanFieldPropertiesForm"
import { FreeTextFieldPropertiesForm } from "./propertyForms/FreeTextFieldPropertiesForm"
import { GroupPropertiesForm } from "./propertyForms/GroupPropertiesForm"
import { HintPropertiesForm } from "./propertyForms/HintPropertiesForm"
import { MultipleChoiceFieldPropertiesForm } from "./propertyForms/MultipleChoiceFieldPropertiesForm"
import { NumberFieldPropertiesForm } from "./propertyForms/NumberFieldPropertiesForm"
import { ParagraphPropertiesForm } from "./propertyForms/ParagraphPropertiesForm"
import { SingleChoiceFieldPropertiesForm } from "./propertyForms/SingleChoiceFieldPropertiesForm"
import { StatementPropertiesForm } from "./propertyForms/StatementPropertiesForm"

export const PropertiesPanel = () => {
  const selectedItem = useAppSelector(selectSelectedItem)
  const template = useAppSelector(selectTemplate)
  const dispatch = useAppDispatch()
  const { t } = useSiteTranslation()

  if (!selectedItem) return null

  const selectedNode = findNode(template, selectedItem)
  invariant(selectedNode, `Node ${selectedItem} not found in template.`)

  const propertiesForm = match(selectedNode)
    .with({ type: "Group" }, (node) => <GroupPropertiesForm node={node} />)
    .with({ type: "BooleanField" }, (node) => <BooleanFieldPropertiesForm node={node} />)
    .with({ type: "NumberField" }, (node) => <NumberFieldPropertiesForm node={node} />)
    .with({ type: "FreeTextField" }, (node) => <FreeTextFieldPropertiesForm node={node} />)
    .with({ type: "SingleChoiceField" }, (node) => <SingleChoiceFieldPropertiesForm node={node} />)
    .with({ type: "MultipleChoiceField" }, (node) => (
      <MultipleChoiceFieldPropertiesForm node={node} />
    ))
    .with({ type: "Statement" }, (node) => <StatementPropertiesForm node={node} />)
    .with({ type: "Paragraph" }, (node) => <ParagraphPropertiesForm node={node} />)
    .with({ type: "Hint" }, (node) => <HintPropertiesForm node={node} />)
    .otherwise(() => {
      throw new Error(`Properties panel not implemented for node type ${selectedNode.type}`)
    })

  return (
    <Flex component="form" pos="relative" h="100%" direction="column">
      <PanelToolbar
        title={t("PropertiesPanel.panelTitle")}
        actions={<CloseButton onClick={() => dispatch(setSelectedItem(null))} />}
        actionsPosition="right"
      />
      <ScrollArea h="100%" style={{ flexGrow: 1 }}>
        <Stack gap="xs" p="xs">
          {propertiesForm}
          <Button
            color="red"
            onClick={() => {
              invariant(selectedItem, "No item selected")
              dispatch(deleteNode({ nodeId: selectedItem }))
              dispatch(setSelectedItem(null))
            }}
          >
            {t("PropertiesPanel.deleteItemButtonLabel")}
          </Button>
        </Stack>
      </ScrollArea>
    </Flex>
  )
}
