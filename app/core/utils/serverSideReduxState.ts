import { RootState } from "RootTypes"
import { CombinedState, PreloadedState } from "redux"
import { ReduxStateProps } from "../types"

export const serverSideReduxState = (
  state: PreloadedState<CombinedState<RootState>>
): ReduxStateProps => ({
  _preloadedReduxState: state,
})
