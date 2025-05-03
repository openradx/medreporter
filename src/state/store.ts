import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
  Reducer,
  PayloadAction,
} from "@reduxjs/toolkit"
import { useDispatch, useSelector, useStore } from "react-redux"
import { merge } from "ts-deepmerge"
import { RESET_STATE } from "./actions"
import designerReducer from "./designerSlice"
import displayReducer from "./displaySlice"
import structureHistoryDataReducer from "./structureHistoryDataSlice"
import structureLiveDataReducer from "./structureLiveDataSlice"
import templateReducer from "./templateSlice"

const combinedReducer = combineReducers({
  designer: designerReducer,
  display: displayReducer,
  structureHistoryData: structureHistoryDataReducer,
  structureLiveData: structureLiveDataReducer,
  template: templateReducer,
})

export type RootState = ReturnType<typeof combinedReducer>

const rootReducer: Reducer<RootState, PayloadAction<Partial<RootState>>> = (
  state: RootState | undefined,
  action: Action & { payload?: Partial<RootState> }
) => {
  if (action.type === RESET_STATE) {
    const resetState = combinedReducer(undefined, { type: RESET_STATE })
    if (action.payload) {
      return merge(resetState, action.payload) as RootState
    }
    return resetState
  }
  return combinedReducer(state, action)
}

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>
