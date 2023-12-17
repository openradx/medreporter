import { Button, CloseButton, Group, Stack, Title, ScrollArea } from "@mantine/core"
import invariant from "tiny-invariant"
import { match } from "ts-pattern"
import { selectSelectedItem, setSelectedItem } from "~/state/designerSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { deleteNode, selectTemplate } from "~/state/templateSlice"
import { findNode } from "~/utils/designerUtils"
import { BooleanFieldPropertiesForm } from "./BooleanFieldPropertiesForm"
import { GroupPropertiesForm } from "./GroupPropertiesForm"
import { NumberFieldPropertiesForm } from "./NumberFieldPropertiesForm"

export const PropertiesPanel = () => {
  const selectedItem = useAppSelector(selectSelectedItem)
  const template = useAppSelector(selectTemplate)
  const dispatch = useAppDispatch()

  if (!selectedItem) return null

  const selectedNode = findNode(template, selectedItem)
  invariant(selectedNode, `Node ${selectedItem} not found in template.`)

  const propertiesForm = match(selectedNode)
    .with({ type: "BooleanField" }, (node) => <BooleanFieldPropertiesForm node={node} />)
    .with({ type: "Group" }, (node) => <GroupPropertiesForm node={node} />)
    .with({ type: "NumberField" }, (node) => <NumberFieldPropertiesForm node={node} />)
    .otherwise(() => {
      throw new Error(`Properties panel not implemented for node type ${selectedNode.type}`)
    })

  return (
    <ScrollArea offsetScrollbars h="100%" style={{ flexGrow: 1 }}>
      <Stack>
        <Group justify="space-between">
          <Title order={5} c="dimmed">
            Properties
          </Title>
          <CloseButton onClick={() => dispatch(setSelectedItem(null))} />
        </Group>
        {propertiesForm}
        <Button
          color="red"
          onClick={() => {
            invariant(selectedItem, "No item selected")
            dispatch(deleteNode({ nodeId: selectedItem }))
            dispatch(setSelectedItem(null))
          }}
        >
          Delete
        </Button>
      </Stack>
    </ScrollArea>
  )
}
