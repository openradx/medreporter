import { useState } from "react"
import { useEvaluatedBoolean } from "~/hooks/useEvaluatedBoolean"
import { MeasurementsOutputNode } from "~/schemas/report"
import { MeasurementsOutput } from "../outputs/MeasurementsOutput"
import { FieldInstanceError } from "./FieldInstanceError"

interface MeasurementsOutputInstanceProps {
  node: MeasurementsOutputNode
}

export const MeasurementsOutputInstance = ({ node }: MeasurementsOutputInstanceProps) => {
  const [error, setError] = useState<Error | null>(null)

  const hidden = useEvaluatedBoolean(node.hidden, false, setError)

  if (error) {
    return <FieldInstanceError error={error} />
  }

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
