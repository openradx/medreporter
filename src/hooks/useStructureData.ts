import { useAppSelector } from "~/state/store"
import { selectStructureHistoryData } from "~/state/structureHistoryDataSlice"

export const useStructureData = () => useAppSelector(selectStructureHistoryData)
