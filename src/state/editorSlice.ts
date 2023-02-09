import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"

type EditorState = {
  resourceType: "figure" | "module" | "template"
  resourceName: string
  compileStatus: "updating" | "ready" | "error"
}

const initialState: EditorState = {
  resourceType: "figure",
  resourceName: "",
  compileStatus: "ready",
}

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditorState(state, action: PayloadAction<EditorState>) {
      state = action.payload
    },
  },
})

export const { setEditorState } = editorSlice.actions

export default editorSlice.reducer

export const selectEditorState = (state: RootState) => state.editor
