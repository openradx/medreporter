import { ModuleDocument } from "@medreporter/medtl-schema"
import { parseModule } from "@medreporter/medtl-tools"
import { Module } from "@prisma/client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "RootTypes"
import { selectEditorState, setEditorState } from "./editorSlice"

interface ModuleState extends Omit<Module, "authorId" | "document"> {
  author: string
  document: ModuleDocument
}

const initialState: { [name: string]: ModuleState } = {}

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule(state, action: PayloadAction<ModuleState>) {
      const module_ = action.payload
      state[module_.name] = module_
    },
  },
})

export const { addModule } = modulesSlice.actions

export default modulesSlice.reducer

export const selectModule = (name: string) => (state: RootState) => state.modules[name]

export const updateModuleCode =
  (name: string, source: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState()
    const editorState = selectEditorState(state)
    const module_ = selectModule(name)(state)
    try {
      dispatch(setEditorState({ ...editorState, compileStatus: "updating" }))

      // TODO: maybe handle in webworker
      // TODO: do I have to do a deep clone?
      const document = parseModule(source)
      module_.document = document
      dispatch(addModule(module_))

      dispatch(setEditorState({ ...editorState, compileStatus: "ready" }))
    } catch (error) {
      dispatch(setEditorState({ ...editorState, compileStatus: "error" }))

      // eslint-disable-next-line no-console
      console.error("Invalid module source code", error)
    }
  }
