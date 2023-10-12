import { RootState } from "RootTypes"
import { TemplateEl } from "~/schemas/template"
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
    children: [],
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
      (_state, _action) => {
        // const { activeId, overId } = action.payload
        // const [foundElement, containerElement] = findElementByGidWithContainer(state, overId)
        // containerElement?.children.push({
        //   type: "NumberField",
        //   gid: createGid(),
        //   id: "number_field_example",
        //   label: "Just a number",
        // })
      }
    ),
  },
})

export const { setTemplate, addElement } = templateSlice.actions

export default templateSlice.reducer

export const selectTemplate = (state: RootState) => state.template.present
