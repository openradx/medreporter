import { Group } from "~/components/fields/Group"
import { NumberField } from "~/components/fields/NumberField"
import { Description } from "~/components/sr/Description"
import { Grid } from "~/components/sr/Grid"
import { GridItem } from "~/components/sr/GridItem"
import { Hint } from "~/components/sr/Hint"
import { Hints } from "~/components/sr/Hints"
import { MAX_HU, MIN_HU } from "~/constants"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"

export const AdrenalWashoutStructure = () => {
  const { t } = useStructureTranslation()

  return (
    <Grid>
      <GridItem size="xl">
        <Description>{t("AdrenalWashout.toolDescription")}</Description>
      </GridItem>
      <Group label={t("AdrenalWashout.groupLabelDensity")}>
        <GridItem size="md">
          <NumberField
            id="nonEnhanced"
            label={t("AdrenalWashout.inputLabelNonEnhanced")}
            min={MIN_HU}
            max={MAX_HU}
            startValue={0}
          />
        </GridItem>
        <GridItem size="md">
          <NumberField
            id="portalVenous"
            label={t("AdrenalWashout.inputLabelPortalVenous")}
            min={MIN_HU}
            max={MAX_HU}
            startValue={0}
          />
        </GridItem>
        <GridItem size="md">
          <NumberField
            id="delayed"
            label={t("AdrenalWashout.inputLabelDelayed")}
            min={MIN_HU}
            max={MAX_HU}
            startValue={0}
          />
        </GridItem>
      </Group>
      <GridItem size="xl">
        <Hints>
          <Hint type="info">{t("AdrenalWashout.hintRoiPlacement")}</Hint>
          <Hint type="info">{t("AdrenalWashout.hintPreferAbsoluteWashout")}</Hint>
        </Hints>
      </GridItem>
    </Grid>
  )
}
