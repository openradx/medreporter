import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"

type EditorState = {
  type: "module" | "template"
  id: number | null
  source: string
}

const initialState: EditorState = {
  type: "module",
  id: null,
  source: "",
}

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setSource(state, action: PayloadAction<string>) {
      state.source = action.payload
    },
  },
})

export const { setSource } = editorSlice.actions

export default editorSlice.reducer

export const selectType = (state: RootState) => state.editor.type

export const selectId = (state: RootState) => state.editor.id

export const selectSource = (state: RootState) => state.editor.source
