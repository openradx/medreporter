import { createAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"

export const resetState = createAction<Partial<RootState> | undefined>("resetState")
