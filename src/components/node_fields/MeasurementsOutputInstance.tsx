import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { MeasurementsOutputNode } from "~/schemas/report"
import { MeasurementsOutput } from "../outputs/MeasurementsOutput"

interface MeasurementsOutputInstanceProps {
  node: MeasurementsOutputNode
}

export const MeasurementsOutputInstance = ({ node }: MeasurementsOutputInstanceProps) => {
  const interpreter = useInterpreter()
  const fieldsCode = useFieldsCode()

  const hidden = useMemo(
    () => interpreter.evalCodeToBoolean(fieldsCode, node.hidden),
    [interpreter, fieldsCode, node.hidden]
  )

  return (
    <MeasurementsOutput
      link={node.link}
      data={[]} // TODO: data via link?
      stats="" // TODO:
      legend={node.legend}
      previousLabel={node.previousLabel}
      currentLabel={node.currentLabel}
      locationLabel={node.locationLabel}
      referenceLabel={node.referenceLabel}
      hidden={hidden}
    />
  )
}
