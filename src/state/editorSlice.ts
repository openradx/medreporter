import { ResourceType } from "@prisma/client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"

type EditorState = {
  resourceType: ResourceType
  resourceName: string
  compileStatus: "updating" | "ready" | "error"
}

const initialState: EditorState = {
  resourceType: "FIGURE",
  resourceName: "",
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
