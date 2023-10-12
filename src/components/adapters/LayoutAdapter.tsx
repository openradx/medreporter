import { LayoutEl } from "~/schemas/structure"
import { Layout } from "../template/Layout"
import { DiscreteFieldAdapter } from "./DiscreteFieldAdapter"
import { HintAdapter } from "./HintAdapter"

interface LayoutAdapterProps {
  element: LayoutEl
}

export const LayoutAdapter = ({ element }: LayoutAdapterProps) => (
  <Layout direction={element.direction} justify={element.justify} nowrap={element.nowrap}>
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
  </Layout>
)
