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
          <NumberField label={t("age")} id="age" min={0} />
        </GridItem>
      </GridGroup>
      <GridItem>
        <NumberField label={t("creatinine")} id="creatinine" precision={2} min={0} />
      </GridItem>
      <GridItem>
        <NumberField label={t("weight")} id="weight" min={0} />
      </GridItem>
      <GridItem>
        <NumberField label={t("height")} id="height" min={0} />
      </GridItem>
      <GridItem>
        <SingleChoiceField
          label={t("gender")}
          id="gender"
          options={[
            { value: "male", label: t("male") },
            { value: "female", label: t("female") },
          ]}
        />
      </GridItem>
      <GridItem>
        <SingleChoiceField
          label={t("ethnicity")}
          id="ethnicity"
          options={[
            { value: "africanAmerican", label: t("africanAmerican") },
            { value: "others", label: t("others") },
          ]}
        />
      </GridItem>
    </Grid>
  )
}
