import { configureStore, combineReducers, ThunkAction, Action } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import designerReducer from "./designerSlice"
import displayReducer from "./displaySlice"
import structureHistoryDataReducer from "./structureHistoryDataSlice"
import structureLiveDataReducer from "./structureLiveDataSlice"
import { templateMiddleware } from "./templateMiddleware"
import templateReducer from "./templateSlice"

const rootReducer = combineReducers({
  designer: designerReducer,
  display: displayReducer,
  structureHistoryData: structureHistoryDataReducer,
  structureLiveData: structureLiveDataReducer,
  template: templateReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function initStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(templateMiddleware.middleware),
  })

  return store
}

type AppStore = ReturnType<typeof initStore>
export type AppDispatch = AppStore["dispatch"]

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>
