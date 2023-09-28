import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { nanoid } from "nanoid"
import { Template } from "~/schemas/template"

type EditorState = {
  template: Template
}

const initialState: EditorState = {
  template: {
    structure: [],
    report: [],
  },
}

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setTemplate(state, action: PayloadAction<Template>) {
      return {
        ...state,
        template: action.payload,
      }
    },
    addElement(state, _action: PayloadAction<{ activeId: string; overId: string }>) {
      state.template.structure.push({
        uuid: nanoid(),
        type: "Number",
        fieldId: "",
        label: "hallo",
      })
    },
  },
})

export const { setTemplate, addElement } = editorSlice.actions

export default editorSlice.reducer

export const selectEditorState = (state: RootState) => state.editor

export const selectStructure = (state: RootState) => state.editor.template.structure
