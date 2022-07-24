import { NumberField } from "../../../core/components/fields/NumberField"
import { SingleChoiceField } from "../../../core/components/fields/SingleChoiceField"
import { Description } from "../../../core/components/structuredReport/Description"
import { Grid } from "../../../core/components/structuredReport/Grid"
import { GridItem } from "../../../core/components/structuredReport/GridItem"

export const GFRStructure = () => (
  <Grid>
    <GridItem size="xl">
      <Description>
        A tool to calculate the GFR using the CKD-EPI equation, the Mayo equation and the
        Cockroft-Gault equation.
      </Description>
    </GridItem>
    <GridItem>
      <NumberField label="Creatinine in mg/dl" id="creatinine" precision={2} />
    </GridItem>
    <GridItem>
      <NumberField label="Age" id="age" />
    </GridItem>
    <GridItem>
      <NumberField label="Weight in kg" id="weight" />
    </GridItem>
    <GridItem>
      <SingleChoiceField
        label="gender"
        id="gender"
        options={[
          { value: "male", label: "male" },
          { value: "female", label: "female" },
        ]}
      />
    </GridItem>
    <GridItem>
      <SingleChoiceField
        label="ethnicity"
        id="ethnicity"
        options={[
          { value: "africanAmerican", label: "African American" },
          { value: "others", label: "Others" },
        ]}
      />
    </GridItem>
  </Grid>
)
