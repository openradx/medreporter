import { Paragraph } from "~/components/template/Paragraph"
import { Report } from "~/components/template/Report"
// import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { useStructureData } from "~/hooks/useStructureData"

// import { i18nReport } from "./locales"

type LungRads2022Data = {
  longaxis: number
  shortaxis: number
}

export const LungRads2022Report = () => {
  const { longaxis, shortaxis } = useStructureData() as LungRads2022Data
  // const { t } = useMicroTranslation(i18nReport)

  return (
    <Report>
      <Paragraph>
        {shortaxis} x {longaxis}
      </Paragraph>
    </Report>
  )
}
