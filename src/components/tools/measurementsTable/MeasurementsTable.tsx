import { Module } from "~/components/sr/Module"
import { Report } from "~/components/sr/Report"
import { Section } from "~/components/sr/Section"
import { Structure } from "~/components/sr/Structure"
import { StructuredReport } from "~/components/sr/StructuredReport"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"
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
