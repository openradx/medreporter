import { NumberField } from "~/components/fields/NumberField"
import { Group } from "~/components/template/Group"
import { Hint } from "~/components/template/Hint"
import { Section } from "~/components/template/Section"
import { Structure } from "~/components/template/Structure"
import { MAX_HU, MIN_HU } from "~/constants"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"

export const AdrenalWashoutStructure = () => {
  const { t } = useStructureTranslation()
  return (
    <Structure>
      <Section id="default" label="default">
        <Hint level="info">{t("AdrenalWashout.toolDescription")}</Hint>
        <Group label={t("AdrenalWashout.groupLabelDensity")}>
          <NumberField
            id="nonEnhanced"
            label={t("AdrenalWashout.inputLabelNonEnhanced")}
            min={MIN_HU}
            max={MAX_HU}
            start={0}
          />
          <NumberField
            id="portalVenous"
            label={t("AdrenalWashout.inputLabelPortalVenous")}
            min={MIN_HU}
            max={MAX_HU}
            start={0}
          />
          <NumberField
            id="delayed"
            label={t("AdrenalWashout.inputLabelDelayed")}
            min={MIN_HU}
            max={MAX_HU}
            start={0}
          />
        </Group>
        <Hint level="info">{t("AdrenalWashout.hintRoiPlacement")}</Hint>
        <Hint level="info">{t("AdrenalWashout.hintPreferAbsoluteWashout")}</Hint>
      </Section>
    </Structure>
  )
}
