import { useStructureTranslation } from "app/core/hooks/useStructureTranslation"
import { Module } from "../../../core/components/structuredReport/Module"
import { Report } from "../../../core/components/structuredReport/Report"
import { Section } from "../../../core/components/structuredReport/Section"
import { Structure } from "../../../core/components/structuredReport/Structure"
import { StructuredReport } from "../../../core/components/structuredReport/StructuredReport"
import { AdrenalMriReport } from "./AdrenalMriReport"
import { AdrenalMriStructure } from "./AdrenalMriStructure"

export const AdrenalMri = () => {
  const { t } = useStructureTranslation()

  return (
    <StructuredReport>
      <Section id="default">
        <Module
          id="adrenalMri"
          title={t("AdrenalMri.toolTitle")}
          links={[
            {
              url: "https://radiopaedia.org/articles/adrenal-adenoma",
              title: "Radiopaedia | Adrenal adenoma",
            },
          ]}
        >
          <Structure>
            <AdrenalMriStructure />
          </Structure>
          <Report>
            <AdrenalMriReport />
          </Report>
        </Module>
      </Section>
    </StructuredReport>
  )
}
