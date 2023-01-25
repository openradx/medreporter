import { Group } from "~/components/fields/Group"
import { NumberField } from "~/components/fields/NumberField"
import { Description } from "~/components/sr/Description"
import { Grid } from "~/components/sr/Grid"
import { GridItem } from "~/components/sr/GridItem"
import { Hint } from "~/components/sr/Hint"
import { Hints } from "~/components/sr/Hints"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"

export const AdrenalMriStructure = () => {
  const { t } = useStructureTranslation()

  return (
    <Grid>
      <GridItem size="lg">
        <Description>{t("AdrenalMri.toolDescription")}</Description>
      </GridItem>
      <Group label={t("AdrenalMri.groupLabelAdrenal")}>
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
      </Group>
      <Group label={t("AdrenalMri.groupLabelSpleen")}>
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
      </Group>
      <Hints>
        <Hint type="info">{t("AdrenalMri.hintLimitations")}</Hint>
        <Hint type="info">{t("AdrenalMri.hintTesla")}</Hint>
      </Hints>
    </Grid>
  )
}
