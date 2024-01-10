import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ActionIcon, MantineStyleProp, Table, TextInput } from "@mantine/core"
import { Control, Controller, FieldArrayWithId, UseFieldArrayRemove } from "react-hook-form"
import { MdDelete as DeleteIcon, MdDragHandle as DragIcon } from "react-icons/md"
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
        <div {...attributes} {...listeners} style={{ cursor: "grab" }}>
          <DragIcon size={20} />
        </div>
      </Table.Td>
      <Table.Td>
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
      <Table.Td>
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
            <DeleteIcon />
          </ActionIcon>
        )}
      </Table.Td>
    </Table.Tr>
  )
}
