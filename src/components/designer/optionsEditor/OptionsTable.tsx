import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Table } from "@mantine/core"
import { Control, FieldArrayWithId, UseFieldArrayMove, UseFieldArrayRemove } from "react-hook-form"
import { useGrabbingCursor } from "~/hooks/useGrabbingCursor"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { Option } from "~/schemas/structure"
import { DraggableOptionRow } from "./DraggableOptionRow"

interface OptionsTableProps {
  control: Control<{ options: Option[] }>
  fields: FieldArrayWithId<{ options: Option[] }, "options", "id">[]
  move: UseFieldArrayMove
  remove: UseFieldArrayRemove
}

export const OptionsTable = ({ control, fields, move, remove }: OptionsTableProps) => {
  const { t } = useSiteTranslation()
  const [grabbingCursorOn, grabbingCursorOff] = useGrabbingCursor()

  const handleDragStart = () => {
    grabbingCursorOn()
  }

  const handleDragEnd = (event: DragEndEvent) => {
    grabbingCursorOff()

    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((item) => item.id === active.id)
      const newIndex = fields.findIndex((item) => item.id === over.id)
      if (oldIndex !== newIndex) {
        move(oldIndex, newIndex)
      }
    }
  }

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Table
        withRowBorders={false}
        horizontalSpacing={4}
        verticalSpacing={4}
        style={{ tableLayout: "fixed" }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: "7%" }} />
            <Table.Th style={{ width: "43%" }}>{t("OptionsTable.labelColumnHeader")}</Table.Th>
            <Table.Th style={{ width: "43%" }}>{t("OptionsTable.valueColumnHeader")}</Table.Th>
            <Table.Th style={{ width: "7%" }} />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <SortableContext items={fields} strategy={verticalListSortingStrategy}>
            {fields.map((item, index) => (
              <DraggableOptionRow
                key={item.id}
                id={item.id}
                index={index}
                item={item}
                control={control}
                deletable={fields.length > 1}
                remove={remove}
              />
            ))}
          </SortableContext>
        </Table.Tbody>
      </Table>
    </DndContext>
  )
}
