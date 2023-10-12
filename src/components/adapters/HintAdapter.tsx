import { HintEl } from "~/schemas/structure"
import { Hint } from "../template/Hint"

interface HintAdapterProps {
  element: HintEl
}

export const HintAdapter = ({ element }: HintAdapterProps) => (
  <Hint level={element.level}>{element.content}</Hint>
)
