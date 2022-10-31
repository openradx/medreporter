import { Module } from "app/core/components/structuredReport/Module"
import { Report } from "app/core/components/structuredReport/Report"
import { Section } from "app/core/components/structuredReport/Section"
import { Structure } from "app/core/components/structuredReport/Structure"
import { StructuredReport } from "app/core/components/structuredReport/StructuredReport"
import { useStructureTranslation } from "app/core/hooks/useStructureTranslation"
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
