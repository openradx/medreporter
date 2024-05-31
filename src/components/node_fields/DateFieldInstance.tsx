import dayjs from "dayjs"
import { useMemo } from "react"
import { DateField } from "~/components/fields/DateField"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { DateFieldNode } from "~/schemas/structure"
import { Info } from "../template/Info"

interface DateFieldInstanceProps {
  node: DateFieldNode
}

export const DateFieldInstance = ({ node }: DateFieldInstanceProps) => {
  const interpreter = useInterpreter()
  const fieldsCode = useFieldsCode()

  const disabled = useMemo(
    () => interpreter.evalCodeToBoolean(fieldsCode, node.disabled),
    [interpreter, fieldsCode, node.disabled]
  )

  const hidden = useMemo(
    () => interpreter.evalCodeToBoolean(fieldsCode, node.hidden),
    [interpreter, fieldsCode, node.hidden]
  )

  return (
    <DateField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={disabled}
      hidden={hidden}
      width={node.width}
      format={node.format ?? undefined}
      defaultValue={node.default ? dayjs(node.default).toISOString() : undefined}
    />
  )
}
