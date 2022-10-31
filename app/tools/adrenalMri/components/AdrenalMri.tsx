import { Module } from "app/core/components/structuredReport/Module"
import { Report } from "app/core/components/structuredReport/Report"
import { Section } from "app/core/components/structuredReport/Section"
import { Structure } from "app/core/components/structuredReport/Structure"
import { StructuredReport } from "app/core/components/structuredReport/StructuredReport"
import { useStructureTranslation } from "app/core/hooks/useStructureTranslation"
import { AdrenalMriReport } from "./AdrenalMriReport"
import { AdrenalMriStructure } from "./AdrenalMriStructure"
import { AdrenalMriInfo } from "./AdrenallMriInfo"

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
          info={<AdrenalMriInfo />}
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
