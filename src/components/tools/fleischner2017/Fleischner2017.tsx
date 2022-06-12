import { FreeTextField } from "../../fields/FreeTextField"
import { NumberField } from "../../fields/NumberField"
import { Module } from "../../structuredReport/Module"
import { Report } from "../../structuredReport/Report"
import { Section } from "../../structuredReport/Section"
import { Structure } from "../../structuredReport/Structure"
import { StructuredReport } from "../../structuredReport/StructuredReport"

export const Fleischner2017 = () => (
  <StructuredReport>
    <Structure>
      <Section id="default" title="Default">
        <Module moduleId="fleischner2017" instanceId="fleischner2017" title="Fleischner 2017">
          <FreeTextField label="Tell me" />
          <FreeTextField variant="multiline" label="More text" />
          <NumberField label="Just a number" />
        </Module>
      </Section>
    </Structure>
    <Report />
  </StructuredReport>
)
