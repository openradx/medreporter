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
        <Description>{t("Gfr.toolDescription")} </Description>
      </GridItem>
      <GridGroup>
        <GridItem>
          <NumberField label={t("Gfr.inputLabelAge")} id="age" min={0} />
        </GridItem>
      </GridGroup>
      <GridItem>
        <NumberField label={t("Gfr.inputLabelCreatinine")} id="creatinine" precision={2} min={0} />
      </GridItem>
      <GridItem>
        <NumberField label={t("Gfr.inputLabelWeight")} id="weight" min={0} />
      </GridItem>
      <GridItem>
        <NumberField label={t("Gfr.inputLabelHeight")} id="height" min={0} />
      </GridItem>
      <GridItem>
        <SingleChoiceField
          label={t("Gfr.inputLabelGender")}
          id="gender"
          options={[
            { value: "male", label: t("Gfr.optionGenderMale") },
            { value: "female", label: t("Gfr.optionGenderFemale") },
          ]}
        />
      </GridItem>
      <GridItem>
        <SingleChoiceField
          label={t("Gfr.inputLabelEthnicity")}
          id="ethnicity"
          options={[
            { value: "africanAmerican", label: t("Gfr.optionEthnicityAfricanAmerican") },
            { value: "others", label: t("Gfr.optionEthnicityOthers") },
          ]}
        />
      </GridItem>
    </Grid>
  )
}
