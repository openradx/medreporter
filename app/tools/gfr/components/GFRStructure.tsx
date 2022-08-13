import { NumberField } from "../../../core/components/fields/NumberField"
import { SingleChoiceField } from "../../../core/components/fields/SingleChoiceField"
import { Description } from "../../../core/components/structuredReport/Description"
import { Grid } from "../../../core/components/structuredReport/Grid"
import { GridGroup } from "../../../core/components/structuredReport/GridGroup"
import { GridItem } from "../../../core/components/structuredReport/GridItem"
import { useStructureTranslation } from "../../../core/hooks/useStructureTranslation"

export const GFRStructure = () => {
  const { t } = useStructureTranslation()
  return (
    <Grid>
      <GridItem size="xl">
        <Description>{t("description")} </Description>
      </GridItem>
      <GridGroup>
        <GridItem>
          <NumberField label="Age" id="age" min={0} />
        </GridItem>
      </GridGroup>
      <GridItem>
        <NumberField label="Creatinine in mg/dl" id="creatinine" precision={2} min={0} />
      </GridItem>
      <GridItem>
        <NumberField label="Weight in kg" id="weight" min={0} />
      </GridItem>
      <GridItem>
        <NumberField label="Height in cm" id="height" min={0} />
      </GridItem>
      <GridItem>
        <SingleChoiceField
          label="Gender"
          id="gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
      </GridItem>
      <GridItem>
        <SingleChoiceField
          label="Ethnicity"
          id="ethnicity"
          options={[
            { value: "africanAmerican", label: "African American" },
            { value: "others", label: "Others" },
          ]}
        />
      </GridItem>
    </Grid>
  )
}
