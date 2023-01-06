declare module "RootTypes" {
  // Defined here to prevent circular dependencies
  // with help from https://stackoverflow.com/a/66324900/166229
  import { AnyAction, StateFromReducersMapObject, ThunkAction } from "@reduxjs/toolkit"

  export type RootState = StateFromReducersMapObject<typeof import("../src/state/store").reducer>
  export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, any, AnyAction>
}
