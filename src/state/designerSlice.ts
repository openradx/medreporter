import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "./store"

interface DesignerState {
  preview: boolean
  menuTimestamp: number
  selectedItem: string | null
}

export const initialState: DesignerState = {
  preview: false,
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
    setPreview(state, action: PayloadAction<boolean>) {
      state.preview = action.payload
    },
    setSelectedItem(state, action: PayloadAction<string | null>) {
      state.selectedItem = action.payload
    },
  },
})

export const { refreshMenu, setPreview, setSelectedItem } = designerSlice.actions

export default designerSlice.reducer

export const selectPreview = (state: RootState) => state.designer.preview

export const selectMenuTimestamp = (state: RootState) => state.designer.menuTimestamp

export const selectSelectedItem = (state: RootState) => state.designer.selectedItem
