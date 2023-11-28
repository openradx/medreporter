import {
  Action,
  CombinedState,
  configureStore,
  PreloadedState,
  ThunkAction,
} from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import designerReducer from "./designerSlice"
import displayReducer from "./displaySlice"
import { historyMiddleware } from "./historyMiddleware"
import historyTrackerReducer from "./historyTrackerSlice"
import structureDataReducer from "./structureDataSlice"
import templateReducer from "./templateSlice"

export const reducer = {
  designer: designerReducer,
  display: displayReducer,
  historyTracker: historyTrackerReducer,
  structureData: structureDataReducer,
  template: templateReducer,
}

export function initStore(preloadedState?: PreloadedState<CombinedState<RootState>>) {
  const store = configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(historyMiddleware),
  })

  return store
}

type Store = ReturnType<typeof initStore>
export type AppDispatch = Store["dispatch"]

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<unknown>
>
