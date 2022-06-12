import { Provider } from "react"
import { createRequiredContext } from "../utils/createRequiredContext"

interface FieldContext<T> {
  instanceId: string
  fieldId: string
  defaultValue?: T
  value?: T
  onChange?: (newValue: T) => void
}

let singleton: any = null

export const getFieldContext = <T>() => {
  if (!singleton) {
    const [useField, FieldContextProvider] = createRequiredContext<FieldContext<T>>("FieldContext")
    singleton = {
      useField,
      FieldContextProvider,
    }
  }
  return singleton as {
    useField: () => FieldContext<T>
    FieldContextProvider: Provider<FieldContext<T>>
  }
}
