import { Module } from "~/components/sr/Module"
import { Report } from "~/components/sr/Report"
import { Section } from "~/components/sr/Section"
import { Structure } from "~/components/sr/Structure"
import { StructuredReport } from "~/components/sr/StructuredReport"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"
import { KidneyVolumeReport } from "./KidneyVolumeReport"
import { KidneyVolumeStructure } from "./KidneyVolumeStructure"

export const KidneyVolume = () => {
  const { t } = useStructureTranslation()

  return (
    <StructuredReport>
      <Section id="default">
        <Module id="kidneyVolume" title={t("KidneyVolume.toolTitle")}>
          <Structure>
            <KidneyVolumeStructure />
          </Structure>
          <Report>
            <KidneyVolumeReport />
          </Report>
        </Module>
      </Section>
    </StructuredReport>
  )
}
