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
        <Description>{t("toolDescriptionGfr")} </Description>
      </GridItem>
      <GridGroup>
        <GridItem>
          <NumberField label={t("inputLabelAge")} id="age" min={0} />
        </GridItem>
      </GridGroup>
      <GridItem>
        <NumberField label={t("inputLabelCreatinine")} id="creatinine" precision={2} min={0} />
      </GridItem>
      <GridItem>
        <NumberField label={t("inputLabelWeight")} id="weight" min={0} />
      </GridItem>
      <GridItem>
        <NumberField label={t("inputLabelHeight")} id="height" min={0} />
      </GridItem>
      <GridItem>
        <SingleChoiceField
          label={t("inputLabelGender")}
          id="gender"
          options={[
            { value: "male", label: t("optionGenderMale") },
            { value: "female", label: t("optionGenderFemale") },
          ]}
        />
      </GridItem>
      <GridItem>
        <SingleChoiceField
          label={t("inputLabelEthnicity")}
          id="ethnicity"
          options={[
            { value: "africanAmerican", label: t("optionEthnicityAfricanAmerican") },
            { value: "others", label: t("optionEthnicityOthers") },
          ]}
        />
      </GridItem>
    </Grid>
  )
}
