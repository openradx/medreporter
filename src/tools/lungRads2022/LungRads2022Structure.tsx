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
import { useStructureData } from "~/hooks/useStructureData"
import { LungRads2022Data } from "./LungRads2022Report"
import { i18nStructure } from "./locales"
import examInfo_de from "./lungRads2022ExamInfo_de.md"
import examInfo_en from "./lungRads2022ExamInfo_en.md"
import incidentalInfo_de from "./lungRads2022IncidentalInfo_de.md"
import incidentalInfo_en from "./lungRads2022IncidentalInfo_en.md"
import measureInfo_de from "./lungRads2022MeasureInfo_de.md"
import measureInfo_en from "./lungRads2022MeasureInfo_en.md"

export const LungRads2022Structure = () => {
  const { t, currentLanguage } = useMicroTranslation(i18nStructure)

  const {
    problematicExam,
    timepoint,
    nodule,
    benignFeatures,
    structure,
    dynamic,
    cyst,
    formation,
    wall,
    dynamicUnilocular,
    dynamicMultilocular,
    suspicious,
  } = useStructureData() as LungRads2022Data

  const examInfo = {
    de: examInfo_de,
    en: examInfo_en,
  }[currentLanguage]

  const measureInfo = {
    de: measureInfo_de,
    en: measureInfo_en,
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
            id="problematicExam"
            label={t("LungRads2022.inputLabelExam")}
            options={[
              { value: "prior-CT-not-available", label: t("LungRads2022.optionExamPriorCT") },
              { value: "not-evaluable", label: t("LungRads2022.optionExamNotEvaluable") },
              { value: "infectious", label: t("LungRads2022.optionExamInfectious") },
              { value: "none", label: t("LungRads2022.optionExamNone") },
            ]}
            extras={<Info>{examInfo}</Info>}
          />
          <SingleChoiceField
            variant="radio"
            id="timepoint"
            label={t("LungRads2022.inputLabelTimepoint")}
            hidden={problematicExam !== "none"}
            options={[
              { value: "baseline", label: t("LungRads2022.optionTimepointBaseline") },
              { value: "follow-up", label: t("LungRads2022.optionTimepointFollowUp") },
            ]}
          />
          <SingleChoiceField
            variant="select"
            id="previous"
            label={t("LungRads2022.inputLabelPrevious")}
            hidden={timepoint !== "follow-up" || problematicExam !== "none"}
            options={[
              { value: "0", label: t("LungRads2022.optionPrevious0") },
              { value: "1", label: t("LungRads2022.optionPrevious1") },
              {
                value: "2",
                label: t("LungRads2022.optionPrevious2"),
              },
              {
                value: "3",
                label: t("LungRads2022.optionPrevious3"),
              },
              {
                value: "4A",
                label: t("LungRads2022.optionPrevious4A"),
              },
              { value: "4B", label: t("LungRads2022.optionPrevious4B") },
              {
                value: "5",
                label: t("LungRads2022.optionPrevious4X"),
              },
            ]}
          />
        </Layout>
        <FindingField
          id="nodule"
          label={t("LungRads2022.inputLabelFindingNodule")}
          hidden={problematicExam !== "none"}
          disabled={cyst}
        >
          <Layout>
            <SingleChoiceField
              variant="radio"
              id="benignFeatures"
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
              hidden={benignFeatures !== "none"}
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
              id="featuresSolid"
              hidden={structure !== "solid" || benignFeatures !== "none"}
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
          <Group
            label={t("LungRads2022.groupLabelDiameter")}
            extras={<Info>{measureInfo}</Info>}
            hidden={benignFeatures !== "none"}
          >
            <NumberField
              id="longaxis"
              label={t("LungRads2022.inputLabelLongaxis")}
              min={0}
              precision={1}
            />
            <NumberField
              id="shortaxis"
              label={t("LungRads2022.inputLabelShortaxis")}
              min={0}
              precision={1}
            />
          </Group>
          <Group
            label={t("LungRads2022.groupLabelDiameterSolid")}
            hidden={structure !== "partsolid" || benignFeatures !== "none"}
          >
            <NumberField
              id="longaxisSolid"
              label={t("LungRads2022.inputLabelSolidLongaxis")}
              min={0}
              precision={1}
            />
            <NumberField
              id="shortaxisSolid"
              label={t("LungRads2022.inputLabelSolidShortaxis")}
              min={0}
              precision={1}
            />
          </Group>
          <Layout>
            <SingleChoiceField
              variant="radio"
              id="dynamic"
              label={t("LungRads2022.inputLabelDynamic")}
              hidden={timepoint !== "follow-up" || benignFeatures !== "none"}
              options={[
                { value: "new", label: t("LungRads2022.optionDynamicNew") },
                { value: "slowly-growing", label: t("LungRads2022.optionDynamicSlowlyGrowing") },
                { value: "growing", label: t("LungRads2022.optionDynamicGrowing") },
                { value: "stable", label: t("LungRads2022.optionDynamicStable") },
              ]}
            />
            <NumberField
              id="timeOfDynamicNodule"
              label={t("LungRads2022.inputLabelTimeOfDynamicNodule")}
              min={0}
              precision={0}
              hidden={dynamic !== "stable" || timepoint !== "follow-up"}
            />
          </Layout>
        </FindingField>
        <FindingField
          id="cyst"
          label={t("LungRads2022.inputLabelFindingCyst")}
          hidden={problematicExam !== "none"}
          disabled={nodule}
        >
          <Hint level="warning">{t("LungRads2022.hintCyst")}</Hint>
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
          <Layout>
            <MultipleChoiceField
              variant="checkbox"
              id="dynamicUnilocular"
              label={t("LungRads2022.inputLabelDynamicUnilocular")}
              hidden={timepoint !== "follow-up" || formation !== "unilocular" || wall !== "thick"}
              options={[
                { value: "stable", label: t("LungRads2022.optionDynamicUnilocularStable") },
                {
                  value: "cyst-growing",
                  label: t("LungRads2022.optionDynamicUnilocularCystGrowing"),
                },
                {
                  value: "wall-growing",
                  label: t("LungRads2022.optionDynamicUnilocularWallGrowing"),
                },
              ]}
            />
            <SingleChoiceField
              variant="radio"
              id="dynamicMultilocular"
              label={t("LungRads2022.inputLabelDynamicMultilocular")}
              hidden={timepoint !== "follow-up" || formation !== "multilocular"}
              options={[
                { value: "stable", label: t("LungRads2022.optionDynamicMultilocularStable") },
                {
                  value: "cyst-growing",
                  label: t("LungRads2022.optionDynamicMultilocularCystGrowing"),
                },
                {
                  value: "newly-multilocular",
                  label: t("LungRads2022.optionDynamicMultilocularNewlyMultilocular"),
                },
                {
                  value: "increased-solid",
                  label: t("LungRads2022.optionDynamicMultilocularIncreasedSolid"),
                },
              ]}
            />
            <NumberField
              id="timeOfDynamicCyst"
              label={t("LungRads2022.inputLabelTimeOfDynamicCyst")}
              min={0}
              precision={0}
              hidden={dynamicMultilocular !== "stable" && dynamicUnilocular !== "stable"}
            />
          </Layout>
        </FindingField>
        <Group hidden={problematicExam !== "none"}>
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
                { value: "GGN-doubled", label: t("LungRads2022.optionSuspiciousGgnDoubled") },
                { value: "other", label: t("LungRads2022.optionSuspiciousOther") },
              ]}
            />
            <FreeTextField
              id="suspiciousOther"
              label={t("LungRads2022.inputLabelSuspiciousOther")}
              hidden={!suspicious?.includes("other")}
            />
          </Layout>
        </Group>
        <Layout>
          <FreeTextField
            multiline
            id="incidentalFindings"
            label={t("LungRads2022.inputLabelIncidentalFindings")}
            extras={<Info>{incidentalInfo}</Info>}
          />
        </Layout>
      </Section>
    </Structure>
  )
}
