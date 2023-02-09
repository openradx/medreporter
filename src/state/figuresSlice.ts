import { Figure } from "@prisma/client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "RootTypes"
import { optimizeSvg } from "~/utils/figureUtils"
import { selectEditorState, setEditorState } from "./editorSlice"

interface FigureState extends Omit<Figure, "authorId"> {
  author: string
}

const initialState: { [name: string]: FigureState } = {}

const figuresSlice = createSlice({
  name: "figures",
  initialState,
  reducers: {
    addFigure(state, action: PayloadAction<FigureState>) {
      const figure = action.payload
      state[figure.name] = figure
    },
  },
})

export const { addFigure } = figuresSlice.actions

export default figuresSlice.reducer

export const selectFigure = (name: string) => (state: RootState) => state.figures[name]

export const updateFigureCode =
  (name: string, source: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState()
    const editorState = selectEditorState(state)
    const figure = selectFigure(name)(state)
    try {
      dispatch(setEditorState({ ...editorState, compileStatus: "updating" }))

      // TODO: maybe handle in webworker
      // TODO: do I have to do a deep clone?
      figure.optimized = optimizeSvg(source)
      dispatch(addFigure(figure))

      dispatch(setEditorState({ ...editorState, compileStatus: "ready" }))
    } catch (error) {
      dispatch(setEditorState({ ...editorState, compileStatus: "error" }))

      // eslint-disable-next-line no-console
      console.error("Invalid module source code", error)
    }
  }
