import { Button, CloseButton, Stack, ScrollArea, Flex } from "@mantine/core"
import invariant from "tiny-invariant"
import { match } from "ts-pattern"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { selectSelectedItem, setSelectedItem } from "~/state/designerSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { deleteNode, selectTemplate } from "~/state/templateSlice"
import { findNode } from "~/utils/designerUtils"
import { PanelToolbar } from "../template/PanelToolbar"
import { DateFieldPropertiesForm } from "./propertiesForms/DateFieldPropertiesForm"
import { FindingFieldPropertiesForm } from "./propertiesForms/FindingFieldPropertiesForm"
import { FreeTextFieldPropertiesForm } from "./propertiesForms/FreeTextFieldPropertiesForm"
import { GroupPropertiesForm } from "./propertiesForms/GroupPropertiesForm"
import { HintPropertiesForm } from "./propertiesForms/HintPropertiesForm"
import { MeasurementsFieldPropertiesForm } from "./propertiesForms/MeasurementsFieldPropertiesForm"
import { MeasurementsOutputPropertiesForm } from "./propertiesForms/MeasurementsOutputPropertiesForm"
import { MultipleChoiceFieldPropertiesForm } from "./propertiesForms/MultipleChoiceFieldPropertiesForm"
import { NumberFieldPropertiesForm } from "./propertiesForms/NumberFieldPropertiesForm"
import { ParagraphPropertiesForm } from "./propertiesForms/ParagraphPropertiesForm"
import { SingleChoiceFieldPropertiesForm } from "./propertiesForms/SingleChoiceFieldPropertiesForm"
import { StatementPropertiesForm } from "./propertiesForms/StatementPropertiesForm"
import { TimeFieldPropertiesForm } from "./propertiesForms/TimeFieldPropertiesForm"

export const PropertiesPanel = () => {
  const selectedItem = useAppSelector(selectSelectedItem)
  const template = useAppSelector(selectTemplate)
  const dispatch = useAppDispatch()
  const { t } = useSiteTranslation()

  if (!selectedItem) return null

  const selectedNode = findNode(template, selectedItem)
  invariant(selectedNode, `Node ${selectedItem} not found in template.`)

  // By using the `key` prop we make sure that the respective component gets remounted and the
  // form is recreated correctly. Otherwise the form would not be reinitialized when when for
  // example another field of the same type is selected.
  // See https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
  const propertiesForm = match(selectedNode)
    .with({ type: "Group" }, (node) => <GroupPropertiesForm key={node.nodeId} node={node} />)
    .with({ type: "FindingField" }, (node) => (
      <FindingFieldPropertiesForm key={node.nodeId} node={node} />
    ))
    .with({ type: "DateField" }, (node) => (
      <DateFieldPropertiesForm key={node.nodeId} node={node} />
    ))
    .with({ type: "TimeField" }, (node) => (
      <TimeFieldPropertiesForm key={node.nodeId} node={node} />
    ))
    .with({ type: "NumberField" }, (node) => (
      <NumberFieldPropertiesForm key={node.nodeId} node={node} />
    ))
    .with({ type: "FreeTextField" }, (node) => (
      <FreeTextFieldPropertiesForm key={node.nodeId} node={node} />
    ))
    .with({ type: "SingleChoiceField" }, (node) => (
      <SingleChoiceFieldPropertiesForm key={node.nodeId} node={node} />
    ))
    .with({ type: "MultipleChoiceField" }, (node) => (
      <MultipleChoiceFieldPropertiesForm key={node.nodeId} node={node} />
    ))
    .with({ type: "MeasurementsField" }, (node) => (
      <MeasurementsFieldPropertiesForm key={node.nodeId} node={node} />
    ))
    .with({ type: "Statement" }, (node) => (
      <StatementPropertiesForm key={node.nodeId} node={node} />
    ))
    .with({ type: "Paragraph" }, (node) => (
      <ParagraphPropertiesForm key={node.nodeId} node={node} />
    ))
    .with({ type: "MeasurementsOutput" }, (node) => (
      <MeasurementsOutputPropertiesForm key={node.nodeId} node={node} />
    ))
    .with({ type: "Hint" }, (node) => <HintPropertiesForm key={node.nodeId} node={node} />)
    .otherwise(() => {
      throw new Error(`Properties panel not implemented for node type ${selectedNode.type}`)
    })

  return (
    <Flex pos="relative" h="100%" direction="column">
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
              dispatch(setSelectedItem(null))
              dispatch(deleteNode({ nodeId: selectedItem }))
            }}
          >
            {t("PropertiesPanel.deleteItemButtonLabel")}
          </Button>
        </Stack>
      </ScrollArea>
    </Flex>
  )
}
