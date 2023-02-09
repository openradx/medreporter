import { TemplateDocument } from "@medreporter/medtl-schema"
import { Template } from "@prisma/client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"

interface TemplateState extends Omit<Template, "authorId" | "document"> {
  author: string
  document: TemplateDocument
}

const initialState: { [name: string]: TemplateState } = {}

const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    addTemplate(state, action: PayloadAction<TemplateState>) {
      const template = action.payload
      state[template.name] = template
    },
  },
})

export const { addTemplate } = templatesSlice.actions

export default templatesSlice.reducer

export const selectTemplate = (name: string) => (state: RootState) => state.templates[name]
