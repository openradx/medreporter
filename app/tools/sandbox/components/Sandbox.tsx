import { Module } from "../../../core/components/structuredReport/Module"
import { Report } from "../../../core/components/structuredReport/Report"
import { Section } from "../../../core/components/structuredReport/Section"
import { Structure } from "../../../core/components/structuredReport/Structure"
import { StructuredReport } from "../../../core/components/structuredReport/StructuredReport"
import { SandboxReport } from "./SandboxReport"
import { SandboxStructure } from "./SandboxStructure"

export const Sandbox = () => (
  <StructuredReport>
    <Section id="default">
      <Module
        id="sandbox"
        title="Sandbox"
        links={[
          {
            url: "https://radiopaedia.org/",
            title: "Radiopaedia",
          },
        ]}
      >
        <Structure>
          <SandboxStructure />
        </Structure>
        <Report>
          <SandboxReport />
        </Report>
      </Module>
    </Section>
  </StructuredReport>
)
