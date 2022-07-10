import { Module } from "../../structuredReport/Module"
import { Report } from "../../structuredReport/Report"
import { Section } from "../../structuredReport/Section"
import { Structure } from "../../structuredReport/Structure"
import { StructuredReport } from "../../structuredReport/StructuredReport"
import { Fleischner2017Info } from "./Fleischner2017Info"
import { Fleischner2017Report } from "./Fleischner2017Report"
import { Fleischner2017Structure } from "./Fleischner2017Structure"

export const Fleischner2017 = () => (
  <StructuredReport>
    <Section id="fleischner2017">
      <Module id="fleischner2017" title="Fleischner 2017" info={<Fleischner2017Info />}>
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
