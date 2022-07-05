import { MeasurementsData, MeasurementsStats } from "../inputs/MeasurementsInput/measurementTypes"

export interface CommonFieldProps {
  id: string
  label?: string
  visible?: boolean
}
export interface ExternalLink {
  url: string
  title: string
}

export interface FieldOption {
  value: string
  label: string
}

export type MeasurementsTransformed = {
  data: MeasurementsData
  stats: MeasurementsStats
}
