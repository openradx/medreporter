import { Module } from "~/components/sr/Module"
import { Report } from "~/components/sr/Report"
import { Section } from "~/components/sr/Section"
import { Structure } from "~/components/sr/Structure"
import { StructuredReport } from "~/components/sr/StructuredReport"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"
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
