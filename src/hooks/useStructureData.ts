import { useAppSelector } from "../state/store"
import { selectStructureData } from "../state/structureDataSlice"

export const useStructureData = () => useAppSelector(selectStructureData)
