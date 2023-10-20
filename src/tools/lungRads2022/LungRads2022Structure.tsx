import { FindingField } from "~/components/fields/FindingField"
import { FreeTextField } from "~/components/fields/FreeTextField"
import { MultipleChoiceField } from "~/components/fields/MultipleChoiceField"
import { NumberField } from "~/components/fields/NumberField"
import { SingleChoiceField } from "~/components/fields/SingleChoiceField"
import { Group } from "~/components/template/Group"
import { Hint } from "~/components/template/Hint"
import { Info } from "~/components/template/Info"
import { Layout } from "~/components/template/Layout"
import { Section } from "~/components/template/Section"
import { Structure } from "~/components/template/Structure"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { i18nStructure } from "./locales"
import examInfo_de from "./lungRads2022ExamInfo_de.md"
import examInfo_en from "./lungRads2022ExamInfo_en.md"
import incidentalInfo_de from "./lungRads2022IncidentalInfo_de.md"
import incidentalInfo_en from "./lungRads2022IncidentalInfo_en.md"

export const LungRads2022Structure = () => {
  const { t, currentLanguage } = useMicroTranslation(i18nStructure)

  const examInfo = {
    de: examInfo_de,
    en: examInfo_en,
  }[currentLanguage]

  const incidentalInfo = {
    de: incidentalInfo_de,
    en: incidentalInfo_en,
  }[currentLanguage]

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
            extras={<Info>{examInfo}</Info>}
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
          <Group label={t("LungRads2022.groupLabelDiameter")}>
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
          <Group label={t("LungRads2022.groupLabelDiameterSolid")}>
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
        <FindingField id="cyst" label={t("LungRads2022.inputLabelFindingCyst")}>
          <Layout>
            <SingleChoiceField
              variant="radio"
              id="wall"
              label={t("LungRads2022.inputLabelWall")}
              options={[
                { value: "thin", label: t("LungRads2022.optionWallThin") },
                { value: "thick", label: t("LungRads2022.optionWallThick") },
              ]}
            />
            <SingleChoiceField
              variant="radio"
              id="formation"
              label={t("LungRads2022.inputLabelFormation")}
              options={[
                { value: "unilocular", label: t("LungRads2022.optionFormationUnilocular") },
                { value: "multilocular", label: t("LungRads2022.optionFormationMultilocular") },
              ]}
            />
          </Layout>
          <MultipleChoiceField
            variant="checkbox"
            id="growing-unilocular"
            label={t("LungRads2022.inputLabelGrowingUnilocular")}
            options={[
              { value: "stable", label: t("LungRads2022.optionGrowingUnilocularStable") },
              {
                value: "cyst-growing",
                label: t("LungRads2022.optionGrowingUnilocularCystGrowing"),
              },
              {
                value: "wall-growing",
                label: t("LungRads2022.optionGrowingUnilocularWallGrowing"),
              },
            ]}
          />
          <MultipleChoiceField
            variant="checkbox"
            id="growing-multilocular"
            label={t("LungRads2022.inputLabelGrowingMultilocular")}
            options={[
              { value: "stable", label: t("LungRads2022.optionGrowingMultilocularStable") },
              {
                value: "cyst-growing",
                label: t("LungRads2022.optionGrowingMultilocularCystGrowing"),
              },
              {
                value: "newly-multilocular",
                label: t("LungRads2022.optionGrowingMultilocularNewlyMultilocular"),
              },
              {
                value: "increased-solid",
                label: t("LungRads2022.optionGrowingMultilocularIncreasedSolid"),
              },
            ]}
          />
        </FindingField>
        <Layout>
          <MultipleChoiceField
            variant="checkbox"
            id="suspicious"
            label={t("LungRads2022.inputLabelSuspicious")}
            options={[
              { value: "spiculation", label: t("LungRads2022.optionSuspiciousSpiculation") },
              {
                value: "lymphadenopathy",
                label: t("LungRads2022.optionSuspiciousLymphadenopathy"),
              },
              { value: "metastasis", label: t("LungRads2022.optionSuspiciousMetastasis") },
              { value: "other", label: t("LungRads2022.optionSuspiciousOther") },
            ]}
          />
          <FreeTextField
            id="other-suspicious"
            label={t("LungRads2022.inputLabelSuspiciousOther")}
          />
          <FreeTextField
            multiline
            id="incidental-findings"
            label={t("LungRads2022.inputLabelIncidentalFindings")}
            extras={<Info>{incidentalInfo}</Info>}
          />
        </Layout>
      </Section>
    </Structure>
  )
}
