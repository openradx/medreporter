import { CombinedState, configureStore, PreloadedState } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import displayReducer from "./displaySlice"
import editorReducer from "./editorSlice"
import figuresReducer from "./figuresSlice"
import { historyMiddleware } from "./historyMiddleware"
import historyTrackerReducer from "./historyTrackerSlice"
import modulesReducer from "./modulesSlice"
import reportReducer from "./reportSlice"
import structureDataReducer from "./structureDataSlice"
import structureReducer from "./structureSlice"
import templatesReducer from "./templatesSlice"

export const reducer = {
  display: displayReducer,
  editor: editorReducer,
  figures: figuresReducer,
  historyTracker: historyTrackerReducer,
  modules: modulesReducer,
  report: reportReducer,
  structureData: structureDataReducer,
  structure: structureReducer,
  templates: templatesReducer,
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
