import { Module } from "../../structuredReport/Module"
import { Report } from "../../structuredReport/Report"
import { Section } from "../../structuredReport/Section"
import { Structure } from "../../structuredReport/Structure"
import { StructuredReport } from "../../structuredReport/StructuredReport"
import { AdrenalWashoutInfo } from "./AdrenalWashoutInfo"
import { AdrenalWashoutReport } from "./AdrenalWashoutReport"
import { AdrenalWashoutStructure } from "./AdrenalWashoutStructure"

export const AdrenalWashout = () => (
  <StructuredReport>
    <Section id="default">
      <Module id="adrenalWashout">
        <Structure
          title="Adrenal Washout"
          links={[
            {
              url: "https://radiopaedia.org/articles/adrenal-washout",
              title: "Radiopaedia | Adrenal Washout",
            },
          ]}
          info={<AdrenalWashoutInfo />}
        >
          <AdrenalWashoutStructure />
        </Structure>
        <Report>
          <AdrenalWashoutReport />
        </Report>
      </Module>
    </Section>
  </StructuredReport>
)
