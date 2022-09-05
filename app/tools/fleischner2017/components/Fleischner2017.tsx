import { useStructureTranslation } from "app/core/hooks/useStructureTranslation"
import { Module } from "../../../core/components/structuredReport/Module"
import { Report } from "../../../core/components/structuredReport/Report"
import { Section } from "../../../core/components/structuredReport/Section"
import { Structure } from "../../../core/components/structuredReport/Structure"
import { StructuredReport } from "../../../core/components/structuredReport/StructuredReport"
import { Fleischner2017Info } from "./Fleischner2017Info"
import { Fleischner2017Report } from "./Fleischner2017Report"
import { Fleischner2017Structure } from "./Fleischner2017Structure"

export const Fleischner2017 = () => {
  const { t } = useStructureTranslation()

  return (
    <StructuredReport>
      <Section id="fleischner2017">
        <Module id="fleischner2017" title={t("toolTitleFleischner")} info={<Fleischner2017Info />}>
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
