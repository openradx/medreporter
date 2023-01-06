import { NumberField } from "~/components/fields/NumberField"
import { SingleChoiceField } from "~/components/fields/SingleChoiceField"
import { Description } from "~/components/sr/Description"
import { Grid } from "~/components/sr/Grid"
import { GridGroup } from "~/components/sr/GridGroup"
import { GridItem } from "~/components/sr/GridItem"
import { Hint } from "~/components/sr/Hint"
import { Hints } from "~/components/sr/Hints"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"
import { RiskFactorsInfo } from "./RiskFactorsInfo"

export const Fleischner2017Structure = () => {
  const { t } = useStructureTranslation()
  return (
    <Grid>
      <GridItem size="xl">
        <Description>{t("Fleischner2017.toolDescription")}</Description>
      </GridItem>
      <GridGroup label={t("Fleischner2017.groupDiameter")}>
        <GridItem>
          <NumberField
            id="longaxis"
            label={t("Fleischner2017.inputLabelLongaxis")}
            min={0}
            defaultValue={0}
          />
        </GridItem>
        <GridItem>
          <NumberField
            id="shortaxis"
            label={t("Fleischner2017.inputLabelShortaxis")}
            min={0}
            defaultValue={0}
          />
        </GridItem>
      </GridGroup>
      <GridItem>
        <SingleChoiceField
          id="structure"
          label={t("Fleischner2017.inputLabelStructure")}
          variant="radio"
          options={[
            { value: "solid", label: t("Fleischner2017.optionStructureSolid") },
            { value: "partsolid", label: t("Fleischner2017.optionStructurePartsolid") },
            { value: "groundglass", label: t("Fleischner2017.optionStructureGroundglass") },
          ]}
        />
      </GridItem>
      <GridItem>
        <SingleChoiceField
          id="count"
          label={t("Fleischner2017.inputLabelCount")}
          variant="radio"
          options={[
            { value: "single", label: t("Fleischner2017.optionCountSingle") },
            { value: "multiple", label: t("Fleischner2017.optionCountMultiple") },
          ]}
        />
      </GridItem>
      <GridItem>
        <SingleChoiceField
          variant="radio"
          id="riskFactors"
          label={t("Fleischner2017.inputLabelRiskFactors")}
          options={[
            { value: "yes", label: t("Fleischner2017.optionsRiskFactorsYes") },
            { value: "no", label: t("Fleischner2017.optionsRiskFactorsNo") },
          ]}
          extras={<RiskFactorsInfo />}
          defaultValue="no"
        />
      </GridItem>
      <GridItem size="xl">
        <Hints>
          <Hint type="warning">{t("Fleischner2017.hintApplicability")}</Hint>
        </Hints>
      </GridItem>
    </Grid>
  )
}

// Link LungRads
