import { List } from "@mantine/core"
import { NumberField } from "../../fields/NumberField"

export const AdrenalWashoutStructure = () => (
  <>
    <NumberField id="nonEnhanced" label="Non-enhanced phase" unit="HU" />
    <NumberField id="portalVenous" label="Portal venous phase" unit="HU" />
    <NumberField id="delayed" label="Delayed phase" unit="HU" />
    <List>
      <List.Item>
        The ROI should cover approximately two-third of the lesion without including the periphery
        to reduce partial volume averaging effects of the surrounding fat.
      </List.Item>
      <List.Item>Whenever possible the absolute washout should be preferred.</List.Item>
    </List>
  </>
)
