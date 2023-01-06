export const SUBMIT_FORM_ERROR = "SUBMIT_FORM_ERROR"

export interface OnSubmitErrors {
  SUBMIT_FORM_ERROR?: string
  [fieldName: string]: any
}

export class FormSubmitError extends Error {
  constructor(public error: string | OnSubmitErrors) {
    super(`An error occurred during form submit: ${error}`)
  }
}
