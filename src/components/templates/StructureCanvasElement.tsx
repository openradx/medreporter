import { ReactNode } from "react"
import { ReportElement } from "~/schemas/report"
import { StructureElement } from "~/schemas/structure"
import { NumberField } from "../fields/NumberField"
import { DraggableElement } from "./DraggableElement"

interface StructureCanvasElementProps {
  element: StructureElement | ReportElement
}

export const StructureCanvasElement = ({ element }: StructureCanvasElementProps) => {
  let component: ReactNode
  if (element.type === "Number") {
    component = <NumberField id={element.fieldId} label={element.label} />
  }
  return <DraggableElement id={element.uuid}>{component}</DraggableElement>
}
