declare module "RootTypes" {
  // Defined here to prevent circular dependencies
  // with help from https://stackoverflow.com/a/66324900/166229
  import { StateFromReducersMapObject } from "@reduxjs/toolkit"
  export type RootState = StateFromReducersMapObject<typeof import("./store").reducer>

  // Defined here to prevent circular dependencies
  import { AnyAction, ThunkAction } from "@reduxjs/toolkit"
  export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, any, AnyAction>
}
