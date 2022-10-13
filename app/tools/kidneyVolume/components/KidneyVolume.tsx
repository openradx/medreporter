import { useStructureTranslation } from "app/core/hooks/useStructureTranslation"
import { Module } from "../../../core/components/structuredReport/Module"
import { Report } from "../../../core/components/structuredReport/Report"
import { Section } from "../../../core/components/structuredReport/Section"
import { Structure } from "../../../core/components/structuredReport/Structure"
import { StructuredReport } from "../../../core/components/structuredReport/StructuredReport"
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
