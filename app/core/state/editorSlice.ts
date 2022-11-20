import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"

type EditorState = {
  type: "module" | "template"
  id: number | null
  code: string
}

const initialState: EditorState = {
  type: "module",
  id: null,
  code: "",
}

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setCode(state, action: PayloadAction<string>) {
      state.code = action.payload
    },
  },
})

export const { setCode } = editorSlice.actions

export default editorSlice.reducer

export const selectType = (state: RootState) => state.editor.type

export const selectId = (state: RootState) => state.editor.id

export const selectCode = (state: RootState) => state.editor.code
