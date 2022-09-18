import { NumberField } from "../../../core/components/fields/NumberField"
import { Description } from "../../../core/components/structuredReport/Description"
import { Grid } from "../../../core/components/structuredReport/Grid"
import { GridGroup } from "../../../core/components/structuredReport/GridGroup"
import { GridItem } from "../../../core/components/structuredReport/GridItem"
import { Hint } from "../../../core/components/structuredReport/Hint"
import { Hints } from "../../../core/components/structuredReport/Hints"
import { MAX_HU, MIN_HU } from "../../../core/constants/general"
import { useStructureTranslation } from "../../../core/hooks/useStructureTranslation"

export const AdrenalWashoutStructure = () => {
  const { t } = useStructureTranslation()

  return (
    <Grid>
      <GridItem size="lg">
        <Description>{t("AdrenalWashout.toolDescription")}</Description>
      </GridItem>
      <GridGroup label={t("AdrenalWashout.groupLabelDensity")}>
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
      </GridGroup>
      <GridItem size="xl">
        <Hints>
          <Hint type="info">{t("AdrenalWashout.hintRoiPlacement")}</Hint>
          <Hint type="info">{t("AdrenalWashout.hintPreferAbsoluteWashout")}</Hint>
        </Hints>
      </GridItem>
    </Grid>
  )
}
