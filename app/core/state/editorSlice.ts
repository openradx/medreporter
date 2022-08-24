import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"

type EditorState = {
  resourceType: "module" | "template"
  resourceId: string | null
  sourceCode: string
  readyForPreview: boolean
}

const initialState: EditorState = {
  resourceType: "module",
  resourceId: null,
  sourceCode: "",
  readyForPreview: false,
}

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setSourceCode(state, action: PayloadAction<string>) {
      state.sourceCode = action.payload
    },
    setReadyForPreview(state, action: PayloadAction<boolean>) {
      state.readyForPreview = action.payload
    },
  },
})

export const { setSourceCode, setReadyForPreview } = editorSlice.actions

export default editorSlice.reducer

export const selectResourceType = (state: RootState) => state.editor.resourceType

export const selectResourceId = (state: RootState) => state.editor.resourceId

export const selectSourceCode = (state: RootState) => state.editor.sourceCode

export const selectReadyForPreview = (state: RootState) => state.editor.readyForPreview
