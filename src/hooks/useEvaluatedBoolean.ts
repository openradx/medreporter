import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "./useFieldsCode"

export const useEvaluatedBoolean = (
  scriptCode: string,
  defaultValue: boolean,
  onError: (e: Error) => void
) => {
  const interpreter = useInterpreter()
  const fieldsCode = useFieldsCode()

  const value = useMemo(() => {
    try {
      return interpreter.evalCodeToBoolean(fieldsCode, scriptCode)
    } catch (e) {
      onError(e as Error)
      return defaultValue
    }
  }, [interpreter, fieldsCode, scriptCode, defaultValue, onError])

  return value
}
