import { Module } from "../../structuredReport/Module"
import { Report } from "../../structuredReport/Report"
import { Section } from "../../structuredReport/Section"
import { Structure } from "../../structuredReport/Structure"
import { StructuredReport } from "../../structuredReport/StructuredReport"
import { SandboxReport } from "./SandboxReport"
import { SandboxStructure } from "./SandboxStructure"

export const Sandbox = () => (
  <StructuredReport>
    <Section id="default">
      <Module id="sandbox">
        <Structure
          title="Sandbox"
          links={[
            {
              url: "https://radiopaedia.org/",
              title: "Radiopaedia",
            },
          ]}
        >
          <SandboxStructure />
        </Structure>
        <Report>
          <SandboxReport />
        </Report>
      </Module>
    </Section>
  </StructuredReport>
)
