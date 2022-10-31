import { Module } from "app/core/components/structuredReport/Module"
import { Report } from "app/core/components/structuredReport/Report"
import { Section } from "app/core/components/structuredReport/Section"
import { Structure } from "app/core/components/structuredReport/Structure"
import { StructuredReport } from "app/core/components/structuredReport/StructuredReport"
import { useStructureTranslation } from "app/core/hooks/useStructureTranslation"
import { AdrenalWashoutInfo } from "./AdrenalWashoutInfo"
import { AdrenalWashoutReport } from "./AdrenalWashoutReport"
import { AdrenalWashoutStructure } from "./AdrenalWashoutStructure"

export const AdrenalWashout = () => {
  const { t } = useStructureTranslation()

  return (
    <StructuredReport>
      <Section id="default">
        <Module
          id="adrenalWashout"
          title={t("AdrenalWashout.toolTitle")}
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
}
