import { useDroppable } from "@dnd-kit/core"
import { Center } from "@mantine/core"
import { CSSProperties } from "react"
import { FaRegTrashCan as TrashCanIcon } from "react-icons/fa6"

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
      <TrashCanIcon size={32} />
    </Center>
  )
}
