import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { Content } from "~/schemas/common"
import { useFieldsCode } from "./useFieldsCode"

export const useContent = (content: Content, onError: (e: Error) => void) => {
  const interpreter = useInterpreter()
  const fieldsCode = useFieldsCode()

  const contentType = content.contentType
  const contentValue = content.contentValue

  const value = useMemo(() => {
    if (contentType === "text") {
      return contentValue
    }

    try {
      return interpreter.evalCodeToString(fieldsCode, contentValue)
    } catch (e) {
      onError(e as Error)
      return ""
    }
  }, [interpreter, fieldsCode, contentValue, contentType, onError])

  return value
}
