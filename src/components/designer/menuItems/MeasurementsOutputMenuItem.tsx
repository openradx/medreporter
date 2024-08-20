import { useMemo } from "react"
import { MeasurementsOutputNode } from "~/schemas/report"
import { selectMenuTimestamp } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { createNodeId } from "~/utils/designerUtils"
import { DraggableMenuItem } from "./DraggableMenuItem"
import { MenuItem } from "./MenuItem"

interface MeasurementsOutputMenuItemProps {
  label: string
}

export const MeasurementsOutputMenuItem = ({ label }: MeasurementsOutputMenuItemProps) => {
  const timestamp = useAppSelector(selectMenuTimestamp)

  const node: MeasurementsOutputNode = useMemo(
    () => ({
      type: "MeasurementsOutput",
      nodeId: createNodeId("measurements-output"),
      link: "",
      hidden: "",
      label: "Measurements",
      legend: "",
      data: [], // TODO: data via link?
      stats: "", // TODO:
      currrentLabel: "",
      previousLabel: "",
      locationLabel: "",
      referenceLabel: "",
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
