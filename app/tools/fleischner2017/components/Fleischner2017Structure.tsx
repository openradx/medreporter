import { NumberField } from "../../../core/components/fields/NumberField"
import { SingleChoiceField } from "../../../core/components/fields/SingleChoiceField"
import { Description } from "../../../core/components/structuredReport/Description"
import { Grid } from "../../../core/components/structuredReport/Grid"
import { GridGroup } from "../../../core/components/structuredReport/GridGroup"
import { GridItem } from "../../../core/components/structuredReport/GridItem"
import { Hint } from "../../../core/components/structuredReport/Hint"
import { Hints } from "../../../core/components/structuredReport/Hints"
import { useStructureTranslation } from "../../../core/hooks/useStructureTranslation"
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
