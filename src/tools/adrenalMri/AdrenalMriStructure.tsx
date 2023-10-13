import { NumberField } from "~/components/fields/NumberField"
import { Group } from "~/components/template/Group"
import { Hint } from "~/components/template/Hint"
import { Section } from "~/components/template/Section"
import { Structure } from "~/components/template/Structure"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"

export const AdrenalMriStructure = () => {
  const { t } = useStructureTranslation()

  return (
    <Structure>
      <Section id="default" label="default">
        <Hint level="info">{t("AdrenalMri.toolDescription")}</Hint>
        <Group label={t("AdrenalMri.groupLabelAdrenal")}>
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
        <Group label={t("AdrenalMri.groupLabelSpleen")}>
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
        <Hint level="info">{t("AdrenalMri.hintLimitations")}</Hint>
        <Hint level="info">{t("AdrenalMri.hintTesla")}</Hint>
      </Section>
    </Structure>
  )
}
