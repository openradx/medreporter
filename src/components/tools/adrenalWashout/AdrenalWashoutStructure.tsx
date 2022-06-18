import { List } from "@mantine/core"
import { NumberField } from "../../fields/NumberField"
import { Structure } from "../../structuredReport/Structure"

export const AdrenalWashoutStucture = () => (
  <Structure title="Adrenal Washout">
    <NumberField id="nonEnhanced" label="Non-enhanced phase HU" />
    <NumberField id="portalVenous" label="Portal venous phase HU" />
    <NumberField id="delayed" label="Delayed phase HU" />
    <List>
      <List.Item>
        The ROI should cover approximately two-third of the lesion without including the perphery to
        reduce partial volume averaging effects of the surrounding fat.
      </List.Item>
      <List.Item>Whenever possible the absolute washout should be preferred.</List.Item>
    </List>
  </Structure>
)
