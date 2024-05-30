import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { FindingField } from "../fields/FindingField"
import { Info } from "../template/Info"

interface FindingNodeFieldProps {
  fieldId: string
  label: string
  info: string
  disabled: string
  hidden: string
  direction: "row" | "column"
  defaultValue: boolean
  children?: React.ReactNode
}

export const FindingNodeField = ({
  fieldId,
  label,
  info,
  disabled,
  hidden,
  direction,
  defaultValue,
  children,
}: FindingNodeFieldProps) => {
  const interpreter = useInterpreter()
  const fieldsCode = useFieldsCode()

  const disabledEval = useMemo(
    () => interpreter.evalCodeToBoolean(fieldsCode, disabled),
    [interpreter, fieldsCode, disabled]
  )

  const hiddenEval = useMemo(
    () => interpreter.evalCodeToBoolean(fieldsCode, hidden),
    [interpreter, fieldsCode, hidden]
  )

  return (
    <FindingField
      id={fieldId}
      label={label}
      extras={info && <Info>{info}</Info>}
      disabled={disabledEval}
      hidden={hiddenEval}
      direction={direction}
      defaultValue={defaultValue}
    >
      {children}
    </FindingField>
  )
}
