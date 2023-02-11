import { parseModule } from "@medreporter/medtl-tools"
import { Prisma, Resource, ResourceType } from "@prisma/client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "RootTypes"
import { selectEditorState, setEditorState } from "./editorSlice"

interface ResourceState extends Omit<Resource, "authorId"> {
  author: string
  document: Prisma.JsonValue
}

const initialState: { [key in ResourceType]: { [name: string]: ResourceState } } = {
  FIGURE: {},
  MODULE: {},
  TEMPLATE: {},
}

const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    addResource(state, action: PayloadAction<ResourceState>) {
      const resource = action.payload
      const { type, name } = resource
      state[type][name] = resource
    },
  },
})

export const { addResource } = resourcesSlice.actions

export default resourcesSlice.reducer

export const selectResource = (type: ResourceType, name: string) => (state: RootState) =>
  state.resources[type][name]

export const updateFigureCode =
  (name: string, source: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState()
    const editorState = selectEditorState(state)
    const figure = selectResource("FIGURE", name)(state)
    try {
      dispatch(setEditorState({ ...editorState, compileStatus: "updating" }))

      // TODO: maybe handle in webworker
      // TODO: do I have to do a deep clone?
      // TODO: optimize SVG on the server
      figure.document = source
      dispatch(addResource(figure))

      dispatch(setEditorState({ ...editorState, compileStatus: "ready" }))
    } catch (error) {
      dispatch(setEditorState({ ...editorState, compileStatus: "error" }))

      // eslint-disable-next-line no-console
      console.error("Invalid module source code", error)
    }
  }

export const updateModuleCode =
  (name: string, source: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState()
    const editorState = selectEditorState(state)
    const resource = selectResource("MODULE", name)(state)
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
