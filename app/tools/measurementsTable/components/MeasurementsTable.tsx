import { Module } from "app/core/components/structuredReport/Module"
import { Report } from "app/core/components/structuredReport/Report"
import { Section } from "app/core/components/structuredReport/Section"
import { Structure } from "app/core/components/structuredReport/Structure"
import { StructuredReport } from "app/core/components/structuredReport/StructuredReport"
import { useStructureTranslation } from "app/core/hooks/useStructureTranslation"
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
