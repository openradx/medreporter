import { useStructureTranslation } from "../../../hooks/useStructureTranslation"
import { Module } from "../../structuredReport/Module"
import { Report } from "../../structuredReport/Report"
import { Section } from "../../structuredReport/Section"
import { Structure } from "../../structuredReport/Structure"
import { StructuredReport } from "../../structuredReport/StructuredReport"
import { MeasurementsTableReport } from "./MeasurementsTableReport"
import { MeasurementsTableStructure } from "./MeasurementsTableStructure"

export const MeasurementsTable = () => {
  const { t } = useStructureTranslation("measurementsTable")

  return (
    <StructuredReport>
      <Section id="measurementsTable">
        <Module id="measurementsTable" title={t("MeasurementsTable.title")}>
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
