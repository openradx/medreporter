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
        <Description>{t("description")}</Description>
      </GridItem>
      <GridGroup label={t("density")}>
        <GridItem size="md">
          <NumberField
            id="nonEnhanced"
            label={t("nonEnhanced")}
            min={MIN_HU}
            max={MAX_HU}
            startValue={0}
          />
        </GridItem>
        <GridItem size="md">
          <NumberField
            id="portalVenous"
            label={t("portalVenous")}
            min={MIN_HU}
            max={MAX_HU}
            startValue={0}
          />
        </GridItem>
        <GridItem size="md">
          <NumberField id="delayed" label={t("delayed")} min={MIN_HU} max={MAX_HU} startValue={0} />
        </GridItem>
      </GridGroup>
      <GridItem size="xl">
        <Hints>
          <Hint>{t("roiHint")}</Hint>
          <Hint>{t("absoluteHint")}</Hint>
        </Hints>
      </GridItem>
    </Grid>
  )
}
