import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"

interface EditorState {
  menuTimestamp: number
}

const initialState: EditorState = {
  menuTimestamp: Date.now(),
}

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    refreshMenu: (state) => {
      state.menuTimestamp = Date.now()
    },
  },
})

export const { refreshMenu } = editorSlice.actions

export default editorSlice.reducer

export const selectMenuTimestamp = (state: RootState) => state.editor.menuTimestamp
