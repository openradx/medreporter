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
        <Description>{t("toolDescriptionFleischner")}</Description>
      </GridItem>
      <GridGroup label={t("groupDiameter")}>
        <GridItem>
          <NumberField id="longaxis" label={t("inputLabelLongaxis")} min={0} defaultValue={0} />
        </GridItem>
        <GridItem>
          <NumberField id="shortaxis" label={t("inputLabelShortaxis")} min={0} defaultValue={0} />
        </GridItem>
      </GridGroup>
      <GridItem>
        <SingleChoiceField
          id="structure"
          label={t("inputLabelStructure")}
          variant="radio"
          options={[
            { value: "solid", label: t("optionStructureSolid") },
            { value: "partsolid", label: t("optionStructurePartsolid") },
            { value: "groundglass", label: t("optionStructureGroundglass") },
          ]}
        />
      </GridItem>
      <GridItem>
        <SingleChoiceField
          id="count"
          label={t("inputLabelCount")}
          variant="radio"
          options={[
            { value: "single", label: t("optionCountSingle") },
            { value: "multiple", label: t("optionCountMultiple") },
          ]}
        />
      </GridItem>
      <GridItem>
        <SingleChoiceField
          variant="radio"
          id="riskFactors"
          label={t("inputLabelRiskFactors")}
          options={[
            { value: "yes", label: t("optionsRiskFactorsYes") },
            { value: "no", label: t("optionsRiskFactorsNo") },
          ]}
          extras={<RiskFactorsInfo />}
          defaultValue="no"
        />
      </GridItem>
      <GridItem size="xl">
        <Hints>
          <Hint type="warning">{t("hintApplicability")}</Hint>
        </Hints>
      </GridItem>
    </Grid>
  )
}

// Link LungRads
