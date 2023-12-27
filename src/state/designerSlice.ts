import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "./store"

interface DesignerState {
  editing: boolean
  menuTimestamp: number
  selectedItem: string | null
}

export const initialState: DesignerState = {
  editing: false,
  menuTimestamp: Date.now(),
  selectedItem: null,
}

export const designerSlice = createSlice({
  name: "designer",
  initialState,
  reducers: {
    refreshMenu(state) {
      state.menuTimestamp = Date.now()
    },
    setEditing(state, action: PayloadAction<boolean>) {
      state.editing = action.payload
    },
    setSelectedItem(state, action: PayloadAction<string | null>) {
      state.selectedItem = action.payload
    },
  },
})

export const { refreshMenu, setEditing, setSelectedItem } = designerSlice.actions

export default designerSlice.reducer

export const selectEditing = (state: RootState) => state.designer.editing

export const selectMenuTimestamp = (state: RootState) => state.designer.menuTimestamp

export const selectSelectedItem = (state: RootState) => state.designer.selectedItem
