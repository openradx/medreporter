import { CombinedState, configureStore, PreloadedState } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { historyMiddleware } from "./historyMiddleware"
import historyTrackerReducer from "./historyTrackerSlice"
import languagesReducer from "./languagesSlice"
import structureDataReducer from "./structureDataSlice"

export const reducer = {
  historyTracker: historyTrackerReducer,
  languages: languagesReducer,
  structureData: structureDataReducer,
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
