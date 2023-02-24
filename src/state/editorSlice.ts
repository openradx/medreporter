import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"

type EditorState = {
  resourceId: string
  compileStatus: "updating" | "ready" | "error"
}

const initialState: EditorState = {
  resourceId: "",
  compileStatus: "ready",
}

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditorState(_state, action: PayloadAction<EditorState>) {
      return action.payload
    },
  },
})

export const { setEditorState } = editorSlice.actions

export default editorSlice.reducer

export const selectEditorState = (state: RootState) => state.editor
