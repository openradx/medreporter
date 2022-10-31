import { Module } from "app/core/components/structuredReport/Module"
import { Report } from "app/core/components/structuredReport/Report"
import { Section } from "app/core/components/structuredReport/Section"
import { Structure } from "app/core/components/structuredReport/Structure"
import { StructuredReport } from "app/core/components/structuredReport/StructuredReport"
import { useStructureTranslation } from "app/core/hooks/useStructureTranslation"
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
