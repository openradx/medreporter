import { NumberField } from "~/components/fields/NumberField"
import { Group } from "~/components/template/Group"
import { Hint } from "~/components/template/Hint"
import { Section } from "~/components/template/Section"
import { Structure } from "~/components/template/Structure"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { i18nStructure } from "./locales"

export const KidneyVolumeStructure = () => {
  const { t } = useMicroTranslation(i18nStructure)

  return (
    <Structure>
      <Section id="default" label="default">
        <Hint level="info">{t("KidneyVolume.toolHint")}</Hint>
        <Group label={t("KidneyVolume.right")}>
          <NumberField id="rightCoronal" label={t("KidneyVolume.coronal")} precision={2} />
          <NumberField id="rightSagittal" label={t("KidneyVolume.sagittal")} precision={2} />
          <NumberField id="rightWidth" label={t("KidneyVolume.width")} precision={2} />
          <NumberField id="rightDepth" label={t("KidneyVolume.depth")} precision={2} />
        </Group>
        <Group label={t("KidneyVolume.left")}>
          <NumberField id="leftCoronal" label={t("KidneyVolume.coronal")} precision={2} />
          <NumberField id="leftSagittal" label={t("KidneyVolume.sagittal")} precision={2} />
          <NumberField id="leftWidth" label={t("KidneyVolume.width")} precision={2} />
          <NumberField id="leftDepth" label={t("KidneyVolume.depth")} precision={2} />
        </Group>
        <Group label={t("KidneyVolume.patient")}>
          <NumberField id="patientHeight" label={t("KidneyVolume.patientHeight")} precision={2} />
          <NumberField id="patientAge" label={t("KidneyVolume.patientAge")} />
        </Group>
      </Section>
    </Structure>
  )
}
