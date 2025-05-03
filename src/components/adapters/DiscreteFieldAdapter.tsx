import { FieldNodeContextProvider } from "~/contexts/FieldNodeContext"
import { DiscreteFieldNode } from "~/schemas/structure"
import { DateFieldAdapter } from "./DateFieldAdapter"
import { FreeTextFieldAdapter } from "./FreeTextFieldAdapter"
import { MeasurementsFieldAdapter } from "./MeasurementsFieldAdapter"
import { MultipleChoiceFieldAdapter } from "./MultipleChoiceFieldAdapter"
import { NumberFieldAdapter } from "./NumberFieldAdapter"
import { SingleChoiceFieldAdapter } from "./SingleChoiceFieldAdapter"
import { TimeFieldAdapter } from "./TimeFieldAdapter"

interface DiscreteFieldAdapterProps {
  node: DiscreteFieldNode
}

export const DiscreteFieldAdapter = ({ node }: DiscreteFieldAdapterProps) => {
  return (
    <FieldNodeContextProvider value={{ node }}>
      {(() => {
        switch (node.type) {
          case "DateField":
            return <DateFieldAdapter key={node.nodeId} node={node} />
          case "FreeTextField":
            return <FreeTextFieldAdapter key={node.nodeId} node={node} />
          case "MeasurementsField":
            return <MeasurementsFieldAdapter key={node.nodeId} node={node} />
          case "MultipleChoiceField":
            return <MultipleChoiceFieldAdapter key={node.nodeId} node={node} />
          case "NumberField":
            return <NumberFieldAdapter key={node.nodeId} node={node} />
          case "SingleChoiceField":
            return <SingleChoiceFieldAdapter key={node.nodeId} node={node} />
          case "TimeField":
            return <TimeFieldAdapter key={node.nodeId} node={node} />
          default:
            throw new Error("Invalid discrete field type")
        }
      })()}
    </FieldNodeContextProvider>
  )
}
