import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"

interface LanguagesState {
  structureLanguage: string
  reportLanguage: string
}

const initialState: LanguagesState = {
  structureLanguage: "as_site",
  reportLanguage: "as_site",
}

export const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    setStructureLanguage(state, action: PayloadAction<string>) {
      state.structureLanguage = action.payload
    },
    setReportLanguage(state, action: PayloadAction<string>) {
      state.reportLanguage = action.payload
    },
  },
})

export const { setStructureLanguage, setReportLanguage } = languagesSlice.actions

export default languagesSlice.reducer

export const selectStructureLanguage = (state: RootState) => state.languages.structureLanguage

export const selectReportLanguage = (state: RootState) => state.languages.reportLanguage
