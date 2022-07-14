import { NumberField } from "../../../core/components/fields/NumberField"
import { SingleChoiceField } from "../../../core/components/fields/SingleChoiceField"
import { Description } from "../../../core/components/structuredReport/Description"
import { Grid } from "../../../core/components/structuredReport/Grid"
import { GridItem } from "../../../core/components/structuredReport/GridItem"
import { Hint } from "../../../core/components/structuredReport/Hint"
import { Hints } from "../../../core/components/structuredReport/Hints"
import { RiskFactorsInfo } from "./RiskFactorsInfo"

export const Fleischner2017Structure = () => {
  const optionsStructure = [
    { value: "solid", label: "solid" },
    { value: "partsolid", label: "partsolid" },
    { value: "groundglass", label: "groundglass" },
  ]
  const optionsCount = [
    { value: "single", label: "single" },
    { value: "multiple", label: "multiple" },
  ]
  const optionsRiskFactors = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ]
  return (
    <Grid>
      <GridItem size="lg">
        <Description>
          Follow-up and management recommendations for indeterminate pulmonary nodules detected
          incidentally on CT published by the Fleischner Society.
        </Description>
      </GridItem>
      <GridItem>
        <NumberField id="longaxis" label="Short axis diameter" min={0} defaultValue={0} />
      </GridItem>
      <GridItem>
        <NumberField id="shortaxis" label="Long axis diameter" min={0} defaultValue={0} />
      </GridItem>
      <GridItem>
        <SingleChoiceField
          id="structure"
          label="Structure"
          variant="radio"
          options={optionsStructure}
        />
      </GridItem>
      <GridItem>
        <SingleChoiceField id="count" label="Count" variant="radio" options={optionsCount} />
      </GridItem>
      <GridItem>
        <SingleChoiceField
          variant="radio"
          id="riskFactors"
          label="Risk factors"
          options={optionsRiskFactors}
          extras={<RiskFactorsInfo />}
          defaultValue="no"
        />
      </GridItem>
      <GridItem size="lg">
        <Hints>
          <Hint>
            The guideline does not apply to lung cancer screening (see LungRads instead), patients
            younger than 35 years, or patients with a history of primary cancer or
            immunosuppression.
          </Hint>
        </Hints>
      </GridItem>
    </Grid>
  )
}

// Link LungRads
