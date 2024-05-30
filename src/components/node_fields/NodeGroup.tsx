import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { Group } from "../template/Group"
import { Info } from "../template/Info"

interface NodeGroupProps {
  fieldId: string
  label: string
  info: string
  disabled: string
  hidden: string
  direction: "row" | "column"
  border: boolean
  children: React.ReactNode
}

export const NodeGroup = ({
  fieldId,
  label,
  info,
  disabled,
  hidden,
  direction,
  border,
  children,
}: NodeGroupProps) => {
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
    <Group
      _id={fieldId}
      label={label}
      extras={info && <Info>{info}</Info>}
      disabled={disabledEval}
      hidden={hiddenEval}
      direction={direction}
      border={border}
    >
      {children}
    </Group>
  )
}
