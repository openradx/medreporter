import { ReactNode } from "react"

export interface CommonFieldProps<TDefaultValue> {
  id: string
  label?: string
  extras?: ReactNode
  defaultValue?: TDefaultValue
  disabled?: boolean
  hidden?: boolean
}
export interface ExternalLink {
  url: string
  title: string
}

export interface FieldOption {
  value: string
  label: string
}
