import { parseModule } from "@medreporter/medtl-tools"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "RootTypes"
import { ResourceWithAuthor } from "~/types/router"
import { selectEditorState, setEditorState } from "./editorSlice"

export interface ResourceState extends Omit<ResourceWithAuthor, "createdAt" | "updatedAt"> {
  createdAt: string
  updatedAt: string
}

const initialState: { [id: string]: ResourceState } = {}

const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    addResource(state, action: PayloadAction<ResourceState>) {
      const resource = action.payload
      const { id } = resource
      state[id] = resource
    },
  },
})

export const { addResource } = resourcesSlice.actions

export default resourcesSlice.reducer

export const selectResource = (id: string) => (state: RootState) => state.resources[id]

export const updateFigureCode =
  (id: string, source: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState()
    const editorState = selectEditorState(state)
    const resource = selectResource(id)(state)
    if (resource.type !== "FIGURE") throw new Error(`Invalid resource type: ${resource.type}`)

    try {
      dispatch(setEditorState({ ...editorState, compileStatus: "updating" }))

      // TODO: maybe handle in webworker
      // TODO: do I have to do a deep clone?
      // TODO: optimize SVG on the server
      resource.document = source
      dispatch(addResource(resource))

      dispatch(setEditorState({ ...editorState, compileStatus: "ready" }))
    } catch (error) {
      dispatch(setEditorState({ ...editorState, compileStatus: "error" }))

      // eslint-disable-next-line no-console
      console.error("Invalid module source code", error)
    }
  }

export const updateModuleCode =
  (id: string, source: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState()
    const editorState = selectEditorState(state)
    const resource = selectResource(id)(state)
    if (resource.type !== "MODULE") throw new Error(`Invalid resource type: ${resource.type}`)

    try {
      dispatch(setEditorState({ ...editorState, compileStatus: "updating" }))

      // TODO: maybe handle in webworker
      // TODO: do I have to do a deep clone?
      const document = parseModule(source)
      resource.document = document as Record<string, any>
      dispatch(addResource(resource))

      dispatch(setEditorState({ ...editorState, compileStatus: "ready" }))
    } catch (error) {
      dispatch(setEditorState({ ...editorState, compileStatus: "error" }))

      // eslint-disable-next-line no-console
      console.error("Invalid module source code", error)
    }
  }
