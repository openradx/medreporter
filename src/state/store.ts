import { CombinedState, configureStore, PreloadedState } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import displayReducer from "./displaySlice"
import editorReducer from "./editorSlice"
import { historyMiddleware } from "./historyMiddleware"
import historyTrackerReducer from "./historyTrackerSlice"
import reportReducer from "./reportSlice"
import resourcesReducer from "./resourcesSlice"
import structureDataReducer from "./structureDataSlice"
import structureReducer from "./structureSlice"

export const reducer = {
  display: displayReducer,
  editor: editorReducer,
  historyTracker: historyTrackerReducer,
  report: reportReducer,
  resources: resourcesReducer,
  structureData: structureDataReducer,
  structure: structureReducer,
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
