import { evalCodeToBoolean } from "~/medtl/interpreter"
import { FindingFieldEl } from "~/schemas/structure"
import { FindingField } from "../fields/FindingField"
import { Info } from "../template/Info"
import { DiscreteFieldAdapter } from "./DiscreteFieldAdapter"
import { HintAdapter } from "./HintAdapter"
import { LayoutAdapter } from "./LayoutAdapter"

interface FindingFieldAdapterProps {
  element: FindingFieldEl
}

export const FindingFieldAdapter = ({ element }: FindingFieldAdapterProps) => (
  <FindingField
    id={element.id}
    label={element.label}
    extras={element.info && <Info>{element.info}</Info>}
    disabled={evalCodeToBoolean(element.disabled)}
    hidden={evalCodeToBoolean(element.hidden)}
    defaultValue={element.default}
  >
    {element.children.map((child) => {
      switch (child.type) {
        case "Layout":
          return <LayoutAdapter key={child.gid} element={child} />
        case "Hint":
          return <HintAdapter key={child.gid} element={child} />
        default:
          return <DiscreteFieldAdapter key={child.gid} element={child} />
      }
    })}
  </FindingField>
)
