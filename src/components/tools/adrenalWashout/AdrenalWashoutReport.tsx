import { useReportData } from "../../../contexts/ReportDataContext"
import {
  calcAbsoluteAdrenalWashout,
  calcRelativeAdrenalWashout,
} from "../../../utils/adrenalWashoutCalculations"
import { Citation } from "../../common/Citation"
import { Paragraph } from "../../structuredReport/Paragraph"
import { Report } from "../../structuredReport/Report"
import { Statement } from "../../structuredReport/Statement"

export const AdrenalWashoutReport = () => {
  const data = useReportData("adrenalWashout") as
    | {
        nonEnhanced: number | null
        portalVenous: number | null
        delayed: number | null
      }
    | undefined

  console.log(data)

  const nonEnhanced = data?.nonEnhanced
  const portalVenous = data?.portalVenous
  const delayed = data?.delayed

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
    <Report>
      Relative washout: {relativeWashout}
      Absolute washout: {absoluteWashout}
      {conclusion}
      <Citation
        title="Technical and Interpretive Pitfalls in Adrenal Imaging"
        authors="Gurinder Nandra, Oliver Duxbury, Pawan Patel, Jaymin H. Patel, Nirav Patel, and Ioannis Vlahos"
        journal="RadioGraphics 2020 40:4, 1041-1060"
      />
      <Citation
        title="Imaging Techniques for Adrenal Lesion Characterization"
        authors="Michael A. Blake, Nagaraj-Setty Halalkere, Giles W. Boland"
        journal="Radiologic Clinics of North America 2008, 46:1, 65-78"
      />
      <Citation
        title="Distinguishing Benign from Malignant Adrenal Masses: Multi–Detector Row CT Protocol with 10-Minute Delay"
        authors="Michael A. Blake, Mannudeep K. Kalra, Ann T. Sweeney, Brian C. Lucey, Michael M. Maher, Dushyant V. Sahani, Elkan F. Halpern, Peter R. Mueller, Peter F. Hahn, and Giles W. Boland"
        journal="Radiology 2006 238:2, 578-585"
      />
      <Citation
        title="Adrenal Adenoma and Pheochromocytoma"
        authors="Northcutt, Benjamin G. MD; Trakhtenbroit, Michael A. MD; Gomez, Erin N. MD; Fishman, Elliot K. MD; Johnson, Pamela T. MD"
        journal="Journal of Computer Assisted Tomography: 2016 40:2, 194-200"
      />
      <Paragraph>
        <Statement fieldId="foobar">fooo</Statement>
      </Paragraph>
      <Paragraph>
        <Statement fieldId="foobar">bar</Statement>
      </Paragraph>
    </Report>
  )
}
