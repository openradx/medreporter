import { useDroppable } from "@dnd-kit/core"
import { Center } from "@mantine/core"
import { Trash2 as TrashCanIcon } from "lucide-react"
import { CSSProperties } from "react"

export const TrashCan = () => {
  const { isOver, active, setNodeRef } = useDroppable({
    id: "trash-can",
  })

  let style: CSSProperties = {}
  if (isOver && active) {
    style = { boxShadow: "0 0 4px 4px red inset" }
  }

  return (
    <Center h="100%" ref={setNodeRef} style={style}>
      <TrashCanIcon size={48} />
    </Center>
  )
}
