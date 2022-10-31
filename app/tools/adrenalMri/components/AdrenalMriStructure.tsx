import { NumberField } from "app/core/components/fields/NumberField"
import { Description } from "app/core/components/structuredReport/Description"
import { Grid } from "app/core/components/structuredReport/Grid"
import { GridGroup } from "app/core/components/structuredReport/GridGroup"
import { GridItem } from "app/core/components/structuredReport/GridItem"
import { Hint } from "app/core/components/structuredReport/Hint"
import { Hints } from "app/core/components/structuredReport/Hints"
import { useStructureTranslation } from "app/core/hooks/useStructureTranslation"

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
      <Hints>
        <Hint type="info">{t("AdrenalMri.hintLimitations")}</Hint>
        <Hint type="info">{t("AdrenalMri.hintTesla")}</Hint>
      </Hints>
    </Grid>
  )
}
