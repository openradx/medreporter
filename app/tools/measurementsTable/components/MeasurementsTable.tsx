import { Module } from "../../../core/components/structuredReport/Module"
import { Report } from "../../../core/components/structuredReport/Report"
import { Section } from "../../../core/components/structuredReport/Section"
import { Structure } from "../../../core/components/structuredReport/Structure"
import { StructuredReport } from "../../../core/components/structuredReport/StructuredReport"
import { useStructureTranslation } from "../../../core/hooks/useStructureTranslation"
import { MeasurementsTableReport } from "./MeasurementsTableReport"
import { MeasurementsTableStructure } from "./MeasurementsTableStructure"

export const MeasurementsTable = () => {
  const { t } = useStructureTranslation()

  return (
    <StructuredReport>
      <Section id="measurementsTable">
        <Module id="measurementsTable" title={t("MeasurementsTable.toolTitle")}>
          <Structure>
            <MeasurementsTableStructure />
          </Structure>
          <Report>
            <MeasurementsTableReport />
          </Report>
        </Module>
      </Section>
    </StructuredReport>
  )
}
