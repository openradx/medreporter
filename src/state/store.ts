import { configureStore, combineReducers, ThunkAction, Action } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import designerReducer from "./designerSlice"
import displayReducer from "./displaySlice"
import { historyMiddleware } from "./historyMiddleware"
import historyTrackerReducer from "./historyTrackerSlice"
import structureDataReducer from "./structureDataSlice"
import templateReducer from "./templateSlice"

const rootReducer = combineReducers({
  designer: designerReducer,
  display: displayReducer,
  historyTracker: historyTrackerReducer,
  structureData: structureDataReducer,
  template: templateReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function initStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(historyMiddleware),
  })

  return store
}

type Store = ReturnType<typeof initStore>
export type AppDispatch = Store["dispatch"]

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>
