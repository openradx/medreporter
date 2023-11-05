import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import React, { useState } from "react"
import { SortableItem } from "./SortableItem"

export const Sortable = () => {
  const [items, setItems] = useState([1, 2, 3])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      setItems((oldItems) => {
        const oldIndex = oldItems.indexOf(active.id as number)
        const newIndex = oldItems.indexOf(over?.id as number)

        return arrayMove(oldItems, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div>
          <div>
            {items.map((id) => (
              <SortableItem key={id} id={id} />
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  )
}
