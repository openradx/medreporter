import { ThunkDispatch } from "@reduxjs/toolkit"
import debounce from "debounce"
import { StructureData, StructureValue } from "~/schemas/structure"
import { setStructureDataModified } from "./displaySlice"
import { AppThunk } from "./store"
import {
  changeStructureHistoryValue,
  redoHistoryData,
  selectCanRedoHistoryData,
  selectCanUndoHistoryData,
  selectStructureHistoryData,
  setStructureHistoryData,
  undoHistoryData,
} from "./structureHistoryDataSlice"
import { changeStructureLiveValue, setStructureLiveData } from "./structureLiveDataSlice"

export const setStructureData =
  (data: StructureData): AppThunk<void> =>
  (dispatch) => {
    dispatch(setStructureLiveData(data))
    dispatch(setStructureHistoryData(data))
  }

const changeHistory = (
  dispatch: ThunkDispatch<any, any, any>,
  fieldId: string,
  value: StructureValue
) => {
  dispatch(changeStructureHistoryValue({ fieldId, value }))
}

const changeHistoryDebounced = debounce(changeHistory, 500)

let prevFieldId = ""

export const changeStructureValue =
  (fieldId: string, value: StructureValue): AppThunk<void> =>
  (dispatch) => {
    dispatch(changeStructureLiveValue({ fieldId, value }))

    if (prevFieldId !== fieldId) {
      changeHistoryDebounced.flush()
      prevFieldId = fieldId
    }
    changeHistoryDebounced(dispatch, fieldId, value)

    dispatch(setStructureDataModified(true))
  }

export const undoStructure = (): AppThunk<void> => (dispatch, getState) => {
  changeHistoryDebounced.flush()
  const state = getState()
  const canUndo = selectCanUndoHistoryData(state)
  if (canUndo) {
    dispatch(undoHistoryData())
  }
  const structureData = selectStructureHistoryData(getState())
  dispatch(setStructureLiveData(structureData))
  dispatch(setStructureDataModified(true))
}

export const redoStructure = (): AppThunk<void> => (dispatch, getState) => {
  changeHistoryDebounced.flush()
  const state = getState()
  const canRedo = selectCanRedoHistoryData(state)
  if (canRedo) {
    dispatch(redoHistoryData())
  }
  const structureData = selectStructureHistoryData(getState())
  dispatch(setStructureLiveData(structureData))
  dispatch(setStructureDataModified(true))
}

export const clearStructure =
  (defaultValues: StructureData): AppThunk<void> =>
  (dispatch) => {
    changeHistoryDebounced.flush()
    dispatch(setStructureData(defaultValues))
    dispatch(setStructureDataModified(true))
  }
