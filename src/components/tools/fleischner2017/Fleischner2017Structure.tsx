import { NumberField } from "~/components/fields/NumberField"
import { SingleChoiceField } from "~/components/fields/SingleChoiceField"
import { Group } from "~/components/template/Group"
import { Hint } from "~/components/template/Hint"
import { Info } from "~/components/template/Info"
import { Section } from "~/components/template/Section"
import { Structure } from "~/components/template/Structure"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"
import riskFactorsInfo_en from "./fleischner2017RiskFactorsInfo_en.md"

export const Fleischner2017Structure = () => {
  const { t } = useStructureTranslation()

  return (
    <Structure>
      <Section id="default" label="default">
        <Hint level="info">{t("Fleischner2017.toolDescription")}</Hint>
        <Group label={t("Fleischner2017.groupDiameter")}>
          <NumberField
            id="longaxis"
            label={t("Fleischner2017.inputLabelLongaxis")}
            min={0}
            defaultValue={0}
          />
          <NumberField
            id="shortaxis"
            label={t("Fleischner2017.inputLabelShortaxis")}
            min={0}
            defaultValue={0}
          />
        </Group>
        <Group>
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
          <SingleChoiceField
            id="count"
            label={t("Fleischner2017.inputLabelCount")}
            variant="radio"
            options={[
              { value: "single", label: t("Fleischner2017.optionCountSingle") },
              { value: "multiple", label: t("Fleischner2017.optionCountMultiple") },
            ]}
          />
          <SingleChoiceField
            variant="radio"
            id="riskFactors"
            label={t("Fleischner2017.inputLabelRiskFactors")}
            options={[
              { value: "yes", label: t("Fleischner2017.optionsRiskFactorsYes") },
              { value: "no", label: t("Fleischner2017.optionsRiskFactorsNo") },
            ]}
            extras={<Info>{riskFactorsInfo_en}</Info>}
            defaultValue="no"
          />
        </Group>
        <Hint level="warning">{t("Fleischner2017.hintApplicability")}</Hint>
      </Section>
    </Structure>
  )
}
