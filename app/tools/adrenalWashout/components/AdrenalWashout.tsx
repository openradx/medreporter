import { Module } from "../../../core/components/structuredReport/Module"
import { Report } from "../../../core/components/structuredReport/Report"
import { Section } from "../../../core/components/structuredReport/Section"
import { Structure } from "../../../core/components/structuredReport/Structure"
import { StructuredReport } from "../../../core/components/structuredReport/StructuredReport"
import { AdrenalWashoutInfo } from "./AdrenalWashoutInfo"
import { AdrenalWashoutReport } from "./AdrenalWashoutReport"
import { AdrenalWashoutStructure } from "./AdrenalWashoutStructure"

export const AdrenalWashout = () => (
  <StructuredReport>
    <Section id="default">
      <Module
        id="adrenalWashout"
        title="Adrenal Washout"
        links={[
          {
            url: "https://radiopaedia.org/articles/adrenal-washout",
            title: "Radiopaedia | Adrenal Washout",
          },
        ]}
        info={<AdrenalWashoutInfo />}
      >
        <Structure>
          <AdrenalWashoutStructure />
        </Structure>
        <Report>
          <AdrenalWashoutReport />
        </Report>
      </Module>
    </Section>
  </StructuredReport>
)