import { Module } from "app/core/components/structuredReport/Module"
import { Report } from "app/core/components/structuredReport/Report"
import { Section } from "app/core/components/structuredReport/Section"
import { Structure } from "app/core/components/structuredReport/Structure"
import { StructuredReport } from "app/core/components/structuredReport/StructuredReport"
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
