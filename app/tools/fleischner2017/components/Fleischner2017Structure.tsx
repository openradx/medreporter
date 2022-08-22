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
        <Description>{t("description")}</Description>
      </GridItem>
      <GridGroup label={t("diameter")}>
        <GridItem>
          <NumberField id="longaxis" label={t("longaxis.label")} min={0} defaultValue={0} />
        </GridItem>
        <GridItem>
          <NumberField id="shortaxis" label={t("shortaxis.label")} min={0} defaultValue={0} />
        </GridItem>
      </GridGroup>
      <GridItem>
        <SingleChoiceField
          id="structure"
          label={t("structure.label")}
          variant="radio"
          options={[
            { value: "solid", label: t("structure.solid") },
            { value: "partsolid", label: t("structure.partsolid") },
            { value: "groundglass", label: t("structure.groundglass") },
          ]}
        />
      </GridItem>
      <GridItem>
        <SingleChoiceField
          id="count"
          label={t("count.label")}
          variant="radio"
          options={[
            { value: "single", label: t("count.single") },
            { value: "multiple", label: t("count.multiple") },
          ]}
        />
      </GridItem>
      <GridItem>
        <SingleChoiceField
          variant="radio"
          id="riskFactors"
          label={t("riskFactors.label")}
          options={[
            { value: "yes", label: t("riskFactors.yes") },
            { value: "no", label: t("riskFactors.no") },
          ]}
          extras={<RiskFactorsInfo />}
          defaultValue="no"
        />
      </GridItem>
      <GridItem size="xl">
        <Hints>
          <Hint type="warning">{t("hint1")}</Hint>
        </Hints>
      </GridItem>
    </Grid>
  )
}

// Link LungRads
