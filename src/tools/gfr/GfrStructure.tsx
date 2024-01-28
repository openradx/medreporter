import { NumberField } from "~/components/fields/NumberField"
import { SingleChoiceField } from "~/components/fields/SingleChoiceField"
import { Group } from "~/components/template/Group"
import { Hint } from "~/components/template/Hint"
import { Section } from "~/components/template/Section"
import { Structure } from "~/components/template/Structure"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { i18nStructure } from "./locales"

export const GfrStructure = () => {
  const { t } = useMicroTranslation(i18nStructure)

  return (
    <Structure>
      <Section id="default" label="default">
        <Hint level="info" content={t("Gfr.toolHint")} />
        <Group>
          <NumberField label={t("Gfr.inputLabelAge")} id="age" min={0} />
          <NumberField
            label={t("Gfr.inputLabelCreatinine")}
            id="creatinine"
            precision={2}
            min={0}
          />
          <NumberField label={t("Gfr.inputLabelWeight")} id="weight" min={0} />
          <NumberField label={t("Gfr.inputLabelHeight")} id="height" min={0} />
          <SingleChoiceField
            label={t("Gfr.inputLabelGender")}
            id="gender"
            options={[
              { value: "male", label: t("Gfr.optionGenderMale") },
              { value: "female", label: t("Gfr.optionGenderFemale") },
            ]}
          />
          <SingleChoiceField
            label={t("Gfr.inputLabelEthnicity")}
            id="ethnicity"
            options={[
              { value: "africanAmerican", label: t("Gfr.optionEthnicityAfricanAmerican") },
              { value: "others", label: t("Gfr.optionEthnicityOthers") },
            ]}
          />
        </Group>
      </Section>
    </Structure>
  )
}
