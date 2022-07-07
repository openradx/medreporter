import { Module } from "../../structuredReport/Module"
import { Report } from "../../structuredReport/Report"
import { Section } from "../../structuredReport/Section"
import { Structure } from "../../structuredReport/Structure"
import { StructuredReport } from "../../structuredReport/StructuredReport"
import { MeasurementsTableReport } from "./MeasurementsTableReport"
import { MeasurementsTableStructure } from "./MeasurementsTableStructure"

export const MeasurementsTable = () => (
  <StructuredReport>
    <Section id="measurementsTable">
      <Module id="measurementsTable" title="Measurements Table">
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
