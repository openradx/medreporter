import { useStructureTranslation } from "app/core/hooks/useStructureTranslation"
import { Module } from "../../../core/components/structuredReport/Module"
import { Report } from "../../../core/components/structuredReport/Report"
import { Section } from "../../../core/components/structuredReport/Section"
import { Structure } from "../../../core/components/structuredReport/Structure"
import { StructuredReport } from "../../../core/components/structuredReport/StructuredReport"
import { GFRReport } from "./GFRReport"
import { GFRStructure } from "./GFRStructure"

export const GFR = () => {
  const { t } = useStructureTranslation()

  return (
    <StructuredReport>
      <Section id="gfr">
        <Module id="gfr" title={t("Gfr.toolTitle")}>
          <Structure>
            <GFRStructure />
          </Structure>
          <Report>
            <GFRReport />
          </Report>
        </Module>
      </Section>
    </StructuredReport>
  )
}
