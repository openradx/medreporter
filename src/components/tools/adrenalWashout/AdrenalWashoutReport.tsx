import { useReportData } from "../../../contexts/ReportDataContext"
import {
  calcAbsoluteAdrenalWashout,
  calcRelativeAdrenalWashout,
} from "../../../utils/adrenalWashoutCalculations"
import { Paragraph } from "../../structuredReport/Paragraph"
import { Statement } from "../../structuredReport/Statement"

type AdrenalWashoutData = {
  nonEnhanced: number | null
  portalVenous: number | null
  delayed: number | null
}

export const AdrenalWashoutReport = () => {
  const { nonEnhanced, portalVenous, delayed } = useReportData<AdrenalWashoutData>("adrenalWashout")

  // console.log(nonEnhanced)

  let absoluteWashout: number | undefined
  if (nonEnhanced != null && portalVenous != null && delayed != null) {
    absoluteWashout = calcAbsoluteAdrenalWashout(nonEnhanced, portalVenous, delayed)
  }

  let relativeWashout: number | undefined
  if (portalVenous != null && delayed != null) {
    relativeWashout = calcRelativeAdrenalWashout(portalVenous, delayed)
  }

  let conclusion = ""
  if (nonEnhanced != null && nonEnhanced < 0) {
    conclusion =
      "An adrenal lesion with a density <0 HU on nonenhanced CT is highly specific for lipid-rich adenoma (47% sensitive, 100% specific)" //1
  } else if (nonEnhanced != null && nonEnhanced < 10) {
    conclusion =
      "An adrenal lesion with a density <10 HU on nonenhanced CT is fairly specific for lipid-rich adenoma (71% sensitive, 98% specific)" //1
  } else if (nonEnhanced != null && nonEnhanced >= 43) {
    conclusion =
      "An adrenal lesion with a density >43 HU on nonenhanced CT that is neither calcified not hemorrhagic is suspicious for malignancy regardless of washout characteristics. Further diagnostic like FDG-PET/CT should be considered instead of washout imaging." // 2
  } else if (portalVenous != null && portalVenous >= 130) {
    conclusion =
      "An indeterminate adrenal lesion that enhances more than 130 HU is concerning for hypervascular pheochromocytoma." // 3
  } else {
    if (absoluteWashout !== undefined && absoluteWashout >= 60) {
      conclusion = ">60% washout is highly suggestive of adrenal adenoma."
    } else {
      conclusion =
        "<60% washout is not confirming adrenal adenoma, alternative diagnoses should be considered."
    }
    if (relativeWashout !== undefined && relativeWashout >= 40) {
      conclusion = ">40% washout is highly suggestive of adrenal adenoma."
    }
    //  else {
    //   conclusion +
    //     "<40% washout is not confirming adrenal adenoma, alternative diagnoses should be considered."
    // }
    // else {
    //   conclusion = "sucks"
    // }
  }

  return (
    <>
      Relative washout: {relativeWashout}
      Absolute washout: {absoluteWashout}
      {conclusion}
      <Paragraph>
        <Statement fieldId="foobar">fooo</Statement>
      </Paragraph>
      <Paragraph>
        <Statement fieldId="foobar">bar</Statement>
      </Paragraph>
    </>
  )
}
