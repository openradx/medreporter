import { useStructureTranslation } from "app/core/hooks/useStructureTranslation"
import { Module } from "../../../core/components/structuredReport/Module"
import { Report } from "../../../core/components/structuredReport/Report"
import { Section } from "../../../core/components/structuredReport/Section"
import { Structure } from "../../../core/components/structuredReport/Structure"
import { StructuredReport } from "../../../core/components/structuredReport/StructuredReport"
import { GfrReport } from "./GfrReport"
import { GfrStructure } from "./GfrStructure"

export const Gfr = () => {
  const { t } = useStructureTranslation()

  return (
    <StructuredReport>
      <Section id="gfr">
        <Module id="gfr" title={t("Gfr.toolTitle")}>
          <Structure>
            <GfrStructure />
          </Structure>
          <Report>
            <GfrReport />
          </Report>
        </Module>
      </Section>
    </StructuredReport>
  )
}
