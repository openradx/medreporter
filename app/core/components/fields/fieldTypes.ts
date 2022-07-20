export interface CommonFieldProps {
  id: string
  label?: string
  visible?: boolean
  disabled?: boolean
}
export interface ExternalLink {
  url: string
  title: string
}

export interface FieldOption {
  value: string
  label: string
}