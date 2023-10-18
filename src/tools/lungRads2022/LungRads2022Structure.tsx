import { FindingField } from "~/components/fields/FindingField"
import { MultipleChoiceField } from "~/components/fields/MultipleChoiceField"
import { NumberField } from "~/components/fields/NumberField"
import { SingleChoiceField } from "~/components/fields/SingleChoiceField"
import { Group } from "~/components/template/Group"
import { Hint } from "~/components/template/Hint"
import { Layout } from "~/components/template/Layout"
import { Section } from "~/components/template/Section"
import { Structure } from "~/components/template/Structure"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { i18nStructure } from "./locales"

export const LungRads2022Structure = () => {
  const { t } = useMicroTranslation(i18nStructure)

  return (
    <Structure>
      <Section id="default" label="default">
        <Hint level="info">{t("LungRads2022.toolHint")}</Hint>
        <Layout>
          <SingleChoiceField
            variant="radio"
            id="scan"
            label={t("LungRads2022.inputLabelScan")}
            options={[
              { value: "baseline", label: t("LungRads2022.optionScanBaseline") },
              { value: "follow-up", label: t("LungRads2022.optionScanFollowUp") },
            ]}
          />
          <MultipleChoiceField
            variant="checkbox"
            id="exam"
            label={t("LungRads2022.inputLabelExam")}
            options={[
              { value: "prior-CT-not-available", label: t("LungRads2022.optionExamPriorCT") },
              { value: "not-evaluable", label: t("LungRads2022.optionExamNotEvaluable") },
              { value: "infectious", label: t("LungRads2022.optionExamInfectious") },
              { value: "none", label: t("LungRads2022.optionExamNone") },
            ]}
          />
        </Layout>
        <FindingField id="findingNodule" label={t("LungRads2022.inputLabelFindingNodule")}>
          <Layout>
            <MultipleChoiceField
              variant="checkbox"
              id="benign-features"
              label={t("LungRads2022.inputLabelBenignFeatures")}
              options={[
                {
                  value: "calcification",
                  label: t("LungRads2022.optionBenignFeaturesCalcification"),
                },
                { value: "fat", label: t("LungRads2022.optionBenignFeaturesFat") },
                { value: "none", label: t("LungRads2022.optionBenignFeaturesNone") },
              ]}
            />
          </Layout>
          <Layout>
            <SingleChoiceField
              id="structure"
              label={t("LungRads2022.inputLabelStructure")}
              variant="radio"
              options={[
                { value: "solid", label: t("LungRads2022.optionStructureSolid") },
                { value: "partsolid", label: t("LungRads2022.optionStructurePartsolid") },
                { value: "groundglass", label: t("LungRads2022.optionStructureGroundglass") },
              ]}
            />
          </Layout>
          <Layout>
            <SingleChoiceField
              variant="radio"
              id="features-solid"
              hidden={false}
              label={t("LungRads2022.inputLabelFeaturesSolid")}
              options={[
                {
                  value: "smooth-margins",
                  label: t("LungRads2022.optionFeaturesSolidSmoothMargins"),
                },
                {
                  value: "subsegmental-airway",
                  label: t("LungRads2022.optionFeaturesSolidSubsegmentalAirway"),
                },
                {
                  value: "segmental-airway",
                  label: t("LungRads2022.optionFeaturesSolidSegmentalAirway"),
                },
                { value: "none", label: t("LungRads2022.optionFeaturesSolidNone") },
              ]}
            />
          </Layout>
          <Group label={t("LungRads2022.groupDiameter")}>
            <NumberField
              id="longaxis"
              label={t("LungRads2022.inputLabelLongaxis")}
              min={0}
              defaultValue={0}
            />
            <NumberField
              id="shortaxis"
              label={t("LungRads2022.inputLabelShortaxis")}
              min={0}
              defaultValue={0}
            />
          </Group>
          <Group label={t("LungRads2022.groupDiameterSolid")}>
            <NumberField
              id="longaxis-solid"
              label={t("LungRads2022.inputLabelSolidLongaxis")}
              min={0}
              defaultValue={0}
            />
            <NumberField
              id="shortaxis-solid"
              label={t("LungRads2022.inputLabelSolidShortaxis")}
              min={0}
              defaultValue={0}
            />
          </Group>
          <Layout>
            <SingleChoiceField
              variant="radio"
              id="growing"
              label={t("LungRads2022.inputLabelGrowing")}
              options={[
                { value: "new", label: t("LungRads2022.optionGrowingNew") },
                { value: "stable", label: t("LungRads2022.optionGrowingStable") },
                { value: "slowly-growing", label: t("LungRads2022.optionGrowingSlowlyGrowing") },
                { value: "growing", label: t("LungRads2022.optionGrowingGrowing") },
                { value: "decreasing", label: t("LungRads2022.optionGrowingDecreasing") },
              ]}
            />
          </Layout>
        </FindingField>
      </Section>
    </Structure>
  )
}
