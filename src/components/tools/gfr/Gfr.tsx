import { Module } from "~/components/sr/Module"
import { Report } from "~/components/sr/Report"
import { Section } from "~/components/sr/Section"
import { Structure } from "~/components/sr/Structure"
import { StructuredReport } from "~/components/sr/StructuredReport"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"
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
