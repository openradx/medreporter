import { useMemo } from "react"
import { MeasurementsFieldNode } from "~/schemas/structure"
import { selectMenuTimestamp } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { createFieldId, createNodeId } from "~/utils/designerUtils"
import { createEmptyMeasurements } from "~/utils/measurementsUtils"
import { DraggableMenuItem } from "./DraggableMenuItem"
import { MenuItem } from "./MenuItem"

interface MeasurementsFieldMenuItemProps {
  label: string
}

export const MeasurementsMenuItem = ({ label }: MeasurementsFieldMenuItemProps) => {
  const timestamp = useAppSelector(selectMenuTimestamp)

  const node: MeasurementsFieldNode = useMemo(
    () => ({
      type: "MeasurementsField",
      nodeId: createNodeId("measurements"),
      fieldId: createFieldId("measurements"),
      label: "Measurements",
      info: "",
      disabled: "",
      hidden: "",
      default: createEmptyMeasurements(false, 2, 2),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timestamp]
  )
  return (
    <DraggableMenuItem node={node}>
      <MenuItem label={label} />
    </DraggableMenuItem>
  )
}
