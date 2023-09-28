import { selectStructure } from "~/state/editorSlice"
import { useAppSelector } from "~/state/store"
import { StructureForm } from "../sr/StructureForm"
import { DroppableLayout } from "./DroppableLayout"
import { StructureCanvasElement } from "./StructureCanvasElement"

export const StructureCanvas = () => {
  const structure = useAppSelector(selectStructure)
  return (
    <StructureForm>
      <DroppableLayout>
        hallo
        {structure.map((element) => (
          <StructureCanvasElement key={element.uuid} element={element} />
        ))}
      </DroppableLayout>
    </StructureForm>
  )
}
