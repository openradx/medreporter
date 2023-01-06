import { Module } from "~/components/sr/Module"
import { Report } from "~/components/sr/Report"
import { Section } from "~/components/sr/Section"
import { Structure } from "~/components/sr/Structure"
import { StructuredReport } from "~/components/sr/StructuredReport"
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
