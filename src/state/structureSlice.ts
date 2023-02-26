import { PayloadAction } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "RootTypes"
import { z } from "zod"
import { createModuleId, createSectionId } from "~/utils/identifiers"
import { activateSection } from "./displaySlice"
import { createHistorySlice, withHistory } from "./historySlice"

// TODO: I guess we don't need Zod here
// ModuleState: key, id
// SectionState: key, title, modules
// StructureState: templateId, sections

const ModuleSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type ModuleState = z.infer<typeof ModuleSchema>

const SectionSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  modules: z.array(ModuleSchema),
})

export type SectionState = z.infer<typeof SectionSchema>

export const TemplateSchema = z.object({
  name: z.string(),
  sections: z.array(SectionSchema),
})

type TemplateState = z.infer<typeof TemplateSchema>

const initialState: TemplateState = {
  name: "",
  sections: [],
}

const structureSlice = createHistorySlice({
  name: "structure",
  initialState,
  reducers: {
    resetTemplateState(state) {
      state.present = initialState
    },
    setTemplateDetails(
      state,
      action: PayloadAction<{
        usernmame: string
        templateId: string
      }>
    ) {
      state.present = { ...state.present, ...action.payload }
    },
    addSection: withHistory<TemplateState, { sectionId?: string; sectionTitle: string }>(
      (state, action) => {
        const { sectionId, sectionTitle } = action.payload
        state.sections.push({
          id: sectionId ?? createSectionId(),
          title: sectionTitle,
          modules: [],
        })
      }
    ),
    removeSection: withHistory<TemplateState, { sectionId: string }>((state, action) => {
      const { sectionId } = action.payload
      state.sections = state.sections.filter((section) => section.id !== sectionId)
    }),
    renameSection: withHistory<TemplateState, { sectionId: string; sectionTitle: string }>(
      (state, action) => {
        const { sectionId, sectionTitle } = action.payload
        const sectionToRename = state.sections.find((section) => section.id === sectionId)
        if (sectionToRename) {
          sectionToRename.title = sectionTitle
        }
      }
    ),
    addModule: withHistory<
      TemplateState,
      {
        sectionId: string
        moduleName: string
        moduleId?: string
        moduleIndex?: number
      }
    >((state, action) => {
      const { sectionId, moduleName, moduleId, moduleIndex } = action.payload
      const sectionToAddModule = state.sections.find((section) => section.id === sectionId)
      let index = moduleIndex
      if (index === undefined) {
        index = sectionToAddModule!.modules.length
      }
      sectionToAddModule!.modules.splice(index, 0, {
        name: moduleName,
        id: moduleId ?? createModuleId(),
      })
    }),
    removeModule: withHistory<TemplateState, { moduleId: string }>((state, action) => {
      const { moduleId } = action.payload
      state.sections.forEach((section) => {
        section.modules = section.modules.filter((module) => module.id !== moduleId)
      })
    }),
    moveSection: withHistory<TemplateState, { oldIndex: number; newIndex: number }>(
      (state, action) => {
        const { oldIndex, newIndex } = action.payload
        state.sections.splice(newIndex, 0, state.sections.splice(oldIndex, 1)[0])
      }
    ),
    moveModule: withHistory<
      TemplateState,
      { oldSectionId: string; oldIndex: number; newSectionId: string; newIndex: number }
    >((state, action) => {
      const { oldSectionId, oldIndex, newSectionId, newIndex } = action.payload
      const oldSection = state.sections.find((section) => section.id === oldSectionId)
      const newSection = state.sections.find((section) => section.id === newSectionId)
      newSection!.modules.splice(newIndex, 0, oldSection!.modules.splice(oldIndex, 1)[0])
    }),
  },
})

export const {
  resetTemplateState,
  setTemplateDetails,
  addSection,
  removeSection,
  moveSection,
  renameSection,
  addModule,
  removeModule,
  moveModule,
} = structureSlice.actions

export const moveModuleToNewSection =
  (params: {
    oldSectionId: string
    oldIndex: number
    newSectionId: string
    newIndex: number
  }): AppThunk =>
  (dispatch) => {
    dispatch(activateSection({ sectionId: params.newSectionId }))
    dispatch(moveModule(params))
  }

export default structureSlice.reducer

export const selectStructure = (state: RootState) => state.structure.present
