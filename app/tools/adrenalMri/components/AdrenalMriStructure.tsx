import { GridGroup } from "app/core/components/structuredReport/GridGroup"
import { NumberField } from "../../../core/components/fields/NumberField"
import { Description } from "../../../core/components/structuredReport/Description"
import { Grid } from "../../../core/components/structuredReport/Grid"
import { GridItem } from "../../../core/components/structuredReport/GridItem"
import { useStructureTranslation } from "../../../core/hooks/useStructureTranslation"

export const AdrenalMriStructure = () => {
  const { t } = useStructureTranslation()

  return (
    <Grid>
      <GridItem size="lg">
        <Description>{t("AdrenalMri.toolDescription")}</Description>
      </GridItem>
      <GridGroup label={t("AdrenalMri.groupLabelAdrenal")}>
        <GridItem size="md">
          <NumberField
            id="inPhaseAdrenal"
            label={t("AdrenalMri.inputLabelAdrenalInPhase")}
            startValue={0}
          />
        </GridItem>
        <GridItem size="md">
          <NumberField
            id="oppPhaseAdrenal"
            label={t("AdrenalMri.inputLabelAdrenalOppPhase")}
            startValue={0}
          />
        </GridItem>
      </GridGroup>
      <GridGroup label={t("AdrenalMri.groupLabelSpleen")}>
        <GridItem size="md">
          <NumberField
            id="inPhaseSpleen"
            label={t("AdrenalMri.inputLabelSpleenInPhase")}
            startValue={0}
          />
        </GridItem>
        <GridItem size="md">
          <NumberField
            id="oppPhaseSpleen"
            label={t("AdrenalMri.inputLabelSpleenOppPhase")}
            startValue={0}
          />
        </GridItem>
      </GridGroup>
    </Grid>
  )
}
