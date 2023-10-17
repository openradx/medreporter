import { RootState } from "RootTypes"
import { TemplateEl } from "~/schemas/template"
import { createElement, findElementByGidWithContainer } from "~/utils/editorUtils"
import { createGid } from "~/utils/identifiers"
import { createHistorySlice, withHistory } from "./historySlice"

type TemplateState = TemplateEl

const initialState: TemplateState = {
  type: "Template",
  gid: createGid(),
  title: "",
  info: "",
  structure: {
    type: "Structure",
    gid: createGid(),
    children: [
      {
        type: "Section",
        gid: createGid(),
        label: "default",
        children: [],
      },
    ],
  },
  report: {
    type: "Report",
    gid: createGid(),
    children: [],
  },
}

const templateSlice = createHistorySlice({
  name: "template",
  initialState,
  reducers: {
    setTemplate: withHistory<TemplateState, TemplateEl>((state, action) => action.payload),
    addElement: withHistory<TemplateState, { activeId: string; overId: string }>(
      (state, action) => {
        const { activeId, overId } = action.payload
        const element = createElement(activeId)
        const [, containerElement] = findElementByGidWithContainer(state, overId)
        if (containerElement?.type === "Section") {
          if (element.type === "BooleanField") {
            containerElement?.children.push(element)
          }
        }
      }
    ),
  },
})

export const { setTemplate, addElement } = templateSlice.actions

export default templateSlice.reducer

export const selectTemplate = (state: RootState) => state.template.present
