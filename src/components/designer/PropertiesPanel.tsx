import { Button, CloseButton, Group, Stack, Title } from "@mantine/core"
import invariant from "tiny-invariant"
import { selectSelectedItem, setSelectedItem } from "~/state/designerSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { deleteNode } from "~/state/templateSlice"

export const PropertiesPanel = () => {
  const selectedItem = useAppSelector(selectSelectedItem)
  const dispatch = useAppDispatch()

  return (
    <Stack>
      <Group>
        <Title order={5} color="dimmed">
          Properties
        </Title>
        <CloseButton onClick={() => dispatch(setSelectedItem(null))} />
      </Group>
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
  )
}
