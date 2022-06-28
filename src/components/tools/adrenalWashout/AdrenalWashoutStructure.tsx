import { List } from "@mantine/core"
import { MAX_HU, MIN_HU } from "../../../constants"
import { NumberField } from "../../fields/NumberField"

export const AdrenalWashoutStructure = () => (
  <>
    <NumberField id="nonEnhanced" label="Non-enhanced phase HU" min={MIN_HU} max={MAX_HU} />
    <NumberField id="portalVenous" label="Portal venous phase HU" min={MIN_HU} max={MAX_HU} />
    <NumberField id="delayed" label="Delayed phase HU" min={MIN_HU} max={MAX_HU} />
    <List>
      <List.Item>
        The ROI should cover approximately two-third of the lesion without including the periphery
        to reduce partial volume averaging effects of the surrounding fat.
      </List.Item>
      <List.Item>Whenever possible the absolute washout should be preferred.</List.Item>
    </List>
  </>
)
