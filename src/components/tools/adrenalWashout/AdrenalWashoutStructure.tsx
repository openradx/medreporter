import { List } from "@mantine/core"
import ArteriesBrain from "../../../../public/images/arteriesBrain.svg"
import { MAX_HU, MIN_HU } from "../../../constants"
import { NumberField } from "../../fields/NumberField"
import { FieldInfo } from "../../structuredReport/FieldInfo"
import { SelectOverlay } from "../../structuredReport/SelectOverlay"

export const AdrenalWashoutStructure = () => (
  <>
    <NumberField
      id="nonEnhanced"
      label="Non-enhanced phase HU"
      min={MIN_HU}
      max={MAX_HU}
      extras={
        <>
          <FieldInfo title="Foo">foobar</FieldInfo>
          <SelectOverlay svgImage={<ArteriesBrain />} />
        </>
      }
    />
    <NumberField id="portalVenous" label="Portal venous phase HU" min={MIN_HU} max={MAX_HU} />
    <NumberField id="delayed" label="Delayed phase HU" min={MIN_HU} max={MAX_HU} />
    <List>
      <List.Item>
        The ROI should cover approximately two-third of the lesion without including the perphery to
        reduce partial volume averaging effects of the surrounding fat.
      </List.Item>
      <List.Item>Whenever possible the absolute washout should be preferred.</List.Item>
    </List>
  </>
)
