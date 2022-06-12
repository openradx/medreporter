import { createSelector, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "RootTypes"
import { z } from "zod"
import { createInstanceId, createSectionId } from "../utils/idUtils"
import { createHistorySlice, withHistory } from "./historySlice"

const ModuleSchema = z.object({
  moduleId: z.string(),
  instanceId: z.string(),
})

export type ModuleState = z.infer<typeof ModuleSchema>

const SectionSchema = z.object({
  sectionId: z.string(),
  title: z.string().optional(),
  modules: z.array(ModuleSchema),
})

export type SectionState = z.infer<typeof SectionSchema>

const ScrollIntoSchema = z.object({
  instanceId: z.string(),
  fieldId: z.string().optional(),
})

type ScrollIntoState = z.infer<typeof ScrollIntoSchema>

export const TemplateSchema = z.object({
  templateId: z.string().nullable(),
  sections: z.array(SectionSchema),
  activeSectionId: z.string(),
  scrollInto: ScrollIntoSchema.nullable(),
})

type TemplateState = z.infer<typeof TemplateSchema>

const initialState: TemplateState = {
  templateId: null,
  sections: [],
  activeSectionId: "",
  scrollInto: null,
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
    activateSection(
      state,
      action: PayloadAction<{ sectionId: string; scrollInto?: ScrollIntoState }>
    ) {
      const { sectionId, scrollInto } = action.payload
      state.present.activeSectionId = sectionId
      state.present.scrollInto = scrollInto ?? null
    },
    addSection: withHistory<TemplateState, { sectionId?: string; sectionTitle: string }>(
      (state, action) => {
        const { sectionId, sectionTitle } = action.payload
        state.sections.push({
          sectionId: sectionId ?? createSectionId(),
          title: sectionTitle,
          modules: [],
        })
      }
    ),
    removeSection: withHistory<TemplateState, { sectionId: string }>((state, action) => {
      const { sectionId } = action.payload
      state.sections = state.sections.filter((section) => section.sectionId !== sectionId)
    }),
    renameSection: withHistory<TemplateState, { sectionId: string; sectionTitle: string }>(
      (state, action) => {
        const { sectionId, sectionTitle } = action.payload
        const sectionToRename = state.sections.find((section) => section.sectionId === sectionId)
        if (sectionToRename) {
          sectionToRename.title = sectionTitle
        }
      }
    ),
    addModule: withHistory<
      TemplateState,
      {
        sectionId: string
        moduleId: string
        instanceId?: string
        moduleIndex?: number
      }
    >((state, action) => {
      const { sectionId, instanceId, moduleIndex, ...rest } = action.payload
      const sectionToAddModule = state.sections.find((section) => section.sectionId === sectionId)
      let index = moduleIndex
      if (index === undefined) {
        index = sectionToAddModule!.modules.length
      }
      sectionToAddModule!.modules.splice(index, 0, {
        instanceId: instanceId ?? createInstanceId(),
        ...rest,
      })
    }),
    removeModule: withHistory<TemplateState, { instanceId: string }>((state, action) => {
      const { instanceId } = action.payload
      state.sections.forEach((section) => {
        section.modules = section.modules.filter((module) => module.instanceId !== instanceId)
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
      const oldSection = state.sections.find((section) => section.sectionId === oldSectionId)
      const newSection = state.sections.find((section) => section.sectionId === newSectionId)
      newSection!.modules.splice(newIndex, 0, oldSection!.modules.splice(oldIndex, 1)[0])
    }),
  },
})

export const {
  resetTemplateState,
  setTemplateDetails,
  activateSection,
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

export const selectTemplate = (state: RootState) => state.structure.present

export const selectTemplateId = (state: RootState) => state.structure.present.templateId

export const selectSections = (state: RootState) => state.structure.present.sections

export const selectModules = createSelector(selectSections, (sections) =>
  sections.flatMap((section) => section.modules)
)

export const selectActiveSectionId = (state: RootState) => state.structure.present.activeSectionId

export const selectScrollInto = (state: RootState) => state.structure.present.scrollInto
