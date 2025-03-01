import { ThunkDispatch } from "@reduxjs/toolkit"
import debounce from "debounce"
import { StructureData, StructureValue } from "~/schemas/structure"
import { setStructureDataModified } from "./displaySlice"
import { AppThunk } from "./store"
import {
  StructureHistoryDataState,
  changeStructureHistoryValue,
  redoHistoryData,
  removeStructureHistoryValue,
  selectCanRedoHistoryData,
  selectCanUndoHistoryData,
  selectStructureHistoryData,
  setStructureHistoryData,
  undoHistoryData,
} from "./structureHistoryDataSlice"
import {
  changeStructureLiveValue,
  removeStructureLiveValue,
  setStructureLiveData,
} from "./structureLiveDataSlice"

export const undoAndSelect = (): AppThunk<StructureHistoryDataState> => (dispatch, getState) => {
  const state = getState()
  const canUndo = selectCanUndoHistoryData(state)
  if (canUndo) {
    dispatch(undoHistoryData())
  }
  return selectStructureHistoryData(getState())
}

export const redoAndSelect = (): AppThunk<StructureHistoryDataState> => (dispatch, getState) => {
  const state = getState()
  const canRedo = selectCanRedoHistoryData(state)
  if (canRedo) {
    dispatch(redoHistoryData())
  }
  return selectStructureHistoryData(getState())
}

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

export const changeHistoryDebounced = debounce(changeHistory, 500)

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

export const removeStructureValue =
  (fieldId: string): AppThunk<void> =>
  (dispatch) => {
    dispatch(removeStructureLiveValue({ fieldId }))
    dispatch(removeStructureHistoryValue({ fieldId }, false))
  }
