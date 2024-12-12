import { NumberField } from "~/components/fields/NumberField"
import { Group } from "~/components/template/Group"
import { Hint } from "~/components/template/Hint"
import { Section } from "~/components/template/Section"
import { Structure } from "~/components/template/Structure"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { i18nStructure } from "./locales"

export const AdrenalMriStructure = () => {
  const { t } = useMicroTranslation(i18nStructure)

  return (
    <Structure>
      <Section id="default" label="default">
        <Hint level="info" content={t("AdrenalMri.toolHint")} />
        <Group border label={t("AdrenalMri.groupLabelAdrenal")}>
          <NumberField
            id="inPhaseAdrenal"
            label={t("AdrenalMri.inputLabelAdrenalInPhase")}
            start={0}
          />
          <NumberField
            id="oppPhaseAdrenal"
            label={t("AdrenalMri.inputLabelAdrenalOppPhase")}
            start={0}
          />
        </Group>
        <Group border label={t("AdrenalMri.groupLabelSpleen")}>
          <NumberField
            id="inPhaseSpleen"
            label={t("AdrenalMri.inputLabelSpleenInPhase")}
            start={0}
          />
          <NumberField
            id="oppPhaseSpleen"
            label={t("AdrenalMri.inputLabelSpleenOppPhase")}
            start={0}
          />
        </Group>
        <Hint level="info" content={t("AdrenalMri.hintLimitations")} />
        <Hint level="info" content={t("AdrenalMri.hintTesla")} />
      </Section>
    </Structure>
  )
}
