import { NumberField } from "~/components/fields/NumberField"
import { Group } from "~/components/template/Group"
import { Hint } from "~/components/template/Hint"
import { Section } from "~/components/template/Section"
import { Structure } from "~/components/template/Structure"
import { MAX_HU, MIN_HU } from "~/constants"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { i18nStructure } from "./locales"

export const AdrenalWashoutStructure = () => {
  const { t } = useMicroTranslation(i18nStructure)

  return (
    <Structure>
      <Section id="default" label="default">
        <Hint level="info" content={t("AdrenalWashout.toolHint")} />
        <Group border label={t("AdrenalWashout.groupLabelDensity")}>
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
        <Hint level="info" content={t("AdrenalWashout.hintRoiPlacement")} />
        <Hint level="info" content={t("AdrenalWashout.hintPreferAbsoluteWashout")} />
      </Section>
    </Structure>
  )
}
