import dayjs from "dayjs"
import { useState } from "react"
import { DateField } from "~/components/fields/DateField"
import { useEvaluatedBoolean } from "~/hooks/useEvaluatedBoolean"
import { DateFieldNode } from "~/schemas/structure"
import { Info } from "../template/Info"
import { FieldInstanceError } from "./FieldInstanceError"

interface DateFieldInstanceProps {
  node: DateFieldNode
}

export const DateFieldInstance = ({ node }: DateFieldInstanceProps) => {
  const [error, setError] = useState<Error | null>(null)

  const disabled = useEvaluatedBoolean(node.disabled, false, setError)
  const hidden = useEvaluatedBoolean(node.hidden, false, setError)

  if (error) {
    return <FieldInstanceError error={error} />
  }

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
