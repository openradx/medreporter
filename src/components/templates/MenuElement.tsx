import { DraggableElement } from "./DraggableElement"

interface MenuElementProps {
  id: string
  label: string
}

export const MenuElement = ({ id, label }: MenuElementProps) => (
  <DraggableElement id={id}>{label}</DraggableElement>
)
