import { Module } from "~/components/sr/Module"
import { Report } from "~/components/sr/Report"
import { Section } from "~/components/sr/Section"
import { Structure } from "~/components/sr/Structure"
import { StructuredReport } from "~/components/sr/StructuredReport"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"
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
