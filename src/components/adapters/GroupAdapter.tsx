import { evalCodeToBoolean } from "~/medtl/interpreter"
import { GroupEl } from "~/schemas/structure"
import { Group } from "../template/Group"
import { Info } from "../template/Info"
import { DiscreteFieldAdapter } from "./DiscreteFieldAdapter"
import { HintAdapter } from "./HintAdapter"
import { LayoutAdapter } from "./LayoutAdapter"

interface GroupAdapterProps {
  element: GroupEl
}

export const GroupAdapter = ({ element }: GroupAdapterProps) => (
  <Group
    label={element.label}
    extras={element.info && <Info>{element.info}</Info>}
    disabled={evalCodeToBoolean(element.disabled)}
    hidden={evalCodeToBoolean(element.hidden)}
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
  </Group>
)
