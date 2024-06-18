import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "./useFieldsCode"

export const useEvaluatedString = (
  scriptCode: string,
  defaultValue: string,
  onError: (e: Error) => void
) => {
  const interpreter = useInterpreter()
  const fieldsCode = useFieldsCode()

  const value = useMemo(() => {
    try {
      return interpreter.evalCodeToString(fieldsCode, scriptCode)
    } catch (e) {
      onError(e as Error)
      return defaultValue
    }
  }, [interpreter, fieldsCode, scriptCode, defaultValue, onError])

  return value
}
