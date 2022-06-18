import { Module } from "../../structuredReport/Module"
import { Section } from "../../structuredReport/Section"
import { StructuredReport } from "../../structuredReport/StructuredReport"
import { AdrenalWashoutReport } from "./AdrenalWashoutReport"
import { AdrenalWashoutStucture } from "./AdrenalWashoutStructure"

export const AdrenalWashout = () => (
  <StructuredReport>
    <Section id="default">
      <Module id="adrenalWashout">
        <AdrenalWashoutStucture />
        <AdrenalWashoutReport />
      </Module>
    </Section>
  </StructuredReport>
)
