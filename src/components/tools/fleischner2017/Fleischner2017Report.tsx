import { useReportData } from "../../../contexts/ReportDataContext"
import { calcAverageDiameter } from "../../../utils/fleischner2017Calculations"
import { Paragraph } from "../../structuredReport/Paragraph"

type Fleischner2017Data = {
  longaxis: number
  shortaxis: number
  structure: "solid" | "groundglass" | "partsolid"
  count: "single" | "multiple"
  riskFactors: boolean
}

export const Fleischner2017Report = () => {
  const { longaxis, shortaxis, structure, count, riskFactors } = useReportData(
    true
  ) as Fleischner2017Data

  const averageDiameter: number | undefined = calcAverageDiameter(longaxis, shortaxis)
  let conclusion = ""

  if (structure === "solid") {
    if (count === "single") {
      if (averageDiameter < 6) {
        if (riskFactors) {
          conclusion =
            "optional CT at 12 months (particularly with suspicious nodule morphology and/or upper lobe location)"
        }
        if (!riskFactors) {
          conclusion = "no routine follow-up required"
        }
      } else if (averageDiameter >= 6 && averageDiameter <= 8) {
        if (riskFactors) {
          conclusion = "CT at 6-12 months, then CT at 18-24 months"
        }
        if (!riskFactors) {
          conclusion = "CT at 6-12 months, then consider CT at 18-24 months"
        }
      } else if (averageDiameter > 8) {
        conclusion = "consider CT at 3 months, PET/CT, or tissue sampling"
      }
    } else if (count === "multiple") {
      if (averageDiameter < 6) {
        if (riskFactors) {
          conclusion = "optional CT at 12 months"
        }
        if (!riskFactors) {
          conclusion = "no routine follow-up required"
        }
      } else if (averageDiameter >= 6) {
        if (riskFactors) {
          conclusion = "CT at 3-6 months, then CT at 18-24 months"
        }
        if (!riskFactors) {
          conclusion = "CT at 3-6 months, then consider CT at 18-24 months"
        }
      }
    }
  } else if (count === "single") {
    if (averageDiameter < 6) {
      conclusion = "no routine follow-up required"
    }
    if (averageDiameter >= 6) {
      if (structure === "groundglass") {
        conclusion = "CT at 6-12 months, then if persistent, CT every 2 years until 5 years"
      }
      if (structure === "partsolid") {
        conclusion =
          "CT at 3-6 months, then if persistent and solid component remains <6 mm, annual CT until 5 years"
      }
    }
  } else if (count === "multiple") {
    if (averageDiameter < 6) {
      conclusion =
        "CT at 3-6 months, then if stable consider CT at 2 and 4 years in high-risk patients"
    }
    if (averageDiameter >= 6) {
      conclusion =
        "CT at 3-6 months, then subsequent management based on the most suspicious nodule(s)"
    }
  }

  return (
    <>
      <Paragraph>Recommendation: {conclusion}</Paragraph>
    </>
  )
}
