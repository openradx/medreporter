import { Module } from "~/components/sr/Module"
import { Report } from "~/components/sr/Report"
import { Section } from "~/components/sr/Section"
import { Structure } from "~/components/sr/Structure"
import { StructuredReport } from "~/components/sr/StructuredReport"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"
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
