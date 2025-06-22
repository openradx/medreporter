import { SegmentedControl } from "@mantine/core";
import {
  selectAcquisitionMode,
  setAcquisitionMode,
  type AcquisitionMode,
} from "~/state/displaySlice";
import { useAppDispatch, useAppSelector } from "~/state/store";

export const AcquisitionModeToggle = () => {
  const dispatch = useAppDispatch();
  const acquisitionMode = useAppSelector(selectAcquisitionMode);

  return (
    <SegmentedControl
      value={acquisitionMode}
      onChange={(value) =>
        dispatch(setAcquisitionMode(value as AcquisitionMode))
      }
      data={[
        { label: "Structure", value: "structure" },
        { label: "Report", value: "report" },
      ]}
    />
  );
};
