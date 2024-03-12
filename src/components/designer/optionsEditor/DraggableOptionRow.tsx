import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ActionIcon, Flex, MantineStyleProp, Table, TextInput } from "@mantine/core"
import { Trash2 as DeleteIcon, GripHorizontal as DragIcon } from "lucide-react"
import { Control, Controller, FieldArrayWithId, UseFieldArrayRemove } from "react-hook-form"
import { Option } from "~/schemas/structure"

interface DraggableOptionRowProps {
  id: string
  index: number
  item: FieldArrayWithId<{ options: Option[] }, "options", "id">
  control: Control<{ options: Option[] }>
  deletable: boolean
  remove: UseFieldArrayRemove
}

export const DraggableOptionRow = ({
  id,
  index,
  item,
  control,
  deletable,
  remove,
}: DraggableOptionRowProps) => {
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  })

  const style: MantineStyleProp = {
    position: "relative",
    zIndex: isDragging ? 1000 : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Table.Tr key={item.id} style={style} ref={setNodeRef}>
      <Table.Td>
        <Flex
          {...attributes}
          {...listeners}
          style={{ cursor: "grab" }}
          align="center"
          justify="right"
        >
          <DragIcon size={18} />
        </Flex>
      </Table.Td>
      <Table.Td style={{ verticalAlign: "top" }}>
        <Controller
          control={control}
          name={`options.${index}.label`}
          render={({ field, fieldState }) => (
            <TextInput
              size="sm"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
      </Table.Td>
      <Table.Td style={{ verticalAlign: "top" }}>
        <Controller
          control={control}
          name={`options.${index}.value`}
          render={({ field, fieldState }) => (
            <TextInput
              size="sm"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
      </Table.Td>
      <Table.Td>
        {deletable && (
          <ActionIcon variant="subtle" color="red" onClick={() => remove(index)}>
            <DeleteIcon size={18} />
          </ActionIcon>
        )}
      </Table.Td>
    </Table.Tr>
  )
}
