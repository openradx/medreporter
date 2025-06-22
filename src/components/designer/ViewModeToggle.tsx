import { SegmentedControl } from "@mantine/core"
import { selectViewMode, setViewMode, type ViewMode } from "~/state/displaySlice"
import { useAppDispatch, useAppSelector } from "~/state/store"

export const ViewModeToggle = () => {
  const dispatch = useAppDispatch()
  const viewMode = useAppSelector(selectViewMode)

  return (
    <SegmentedControl
      value={viewMode}
      onChange={(value) => dispatch(setViewMode(value as ViewMode))}
      data={[
        { label: "Structure", value: "structure" },
        { label: "Report", value: "report" },
      ]}
    />
  )
}
