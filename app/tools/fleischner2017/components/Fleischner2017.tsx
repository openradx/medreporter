import { Module } from "app/core/components/structuredReport/Module"
import { Report } from "app/core/components/structuredReport/Report"
import { Section } from "app/core/components/structuredReport/Section"
import { Structure } from "app/core/components/structuredReport/Structure"
import { StructuredReport } from "app/core/components/structuredReport/StructuredReport"
import { useStructureTranslation } from "app/core/hooks/useStructureTranslation"
import { Fleischner2017Info } from "./Fleischner2017Info"
import { Fleischner2017Report } from "./Fleischner2017Report"
import { Fleischner2017Structure } from "./Fleischner2017Structure"

export const Fleischner2017 = () => {
  const { t } = useStructureTranslation()

  return (
    <StructuredReport>
      <Section id="fleischner2017">
        <Module
          id="fleischner2017"
          title={t("Fleischner2017.toolTitle")}
          info={<Fleischner2017Info />}
        >
          <Structure>
            <Fleischner2017Structure />
          </Structure>
          <Report>
            <Fleischner2017Report />
          </Report>
        </Module>
      </Section>
    </StructuredReport>
  )
}
