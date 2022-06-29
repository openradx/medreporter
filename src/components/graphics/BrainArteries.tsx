import { useStructureTranslation } from "../../hooks/useStructureTranslation"
import BrainArteriesSvg from "../../svg/brainArteries.svg"
import { FieldGraphics } from "../structuredReport/FieldGraphics"

export const options = [
  { value: "basilaris", label: "basilaris" },
  { value: "basilarisHead", label: "basilarisHead" },
  { value: "ACA", label: "ACA" },
  { value: "rightV4", label: "rightV4" },
  { value: "rightPICA", label: "rightPICA" },
  { value: "rightSCA", label: "rightSCA" },
  { value: "rightP1", label: "rightP1" },
  { value: "rightP2", label: "rightP2" },
  { value: "rightACP", label: "rightACP" },
  { value: "rightA1", label: "rightA1" },
  { value: "rightA2", label: "rightA2" },
  { value: "rightACMT", label: "rightACMT" },
  { value: "rightM1Proximal", label: "rightM1Proximal" },
  { value: "rightM1Distal", label: "rightM1Distal" },
  { value: "rightM1Bifurcation", label: "rightM1Bifurcation" },
  { value: "rightM2Inferior", label: "rightM2Inferior" },
  { value: "rightM2Superior", label: "rightM2Superior" },
  { value: "leftV4", label: "leftV4" },
  { value: "leftPICA", label: "leftPICA" },
  { value: "leftSCA", label: "leftSCA" },
  { value: "leftP1", label: "leftP1" },
  { value: "leftP2", label: "leftP2" },
  { value: "leftACP", label: "leftACP" },
  { value: "leftA1", label: "leftA1" },
  { value: "leftA2", label: "leftA2" },
  { value: "leftACMT", label: "leftACMT" },
  { value: "leftM1Proximal", label: "leftM1Proximal" },
  { value: "leftM1Distal", label: "leftM1Distal" },
  { value: "leftM1Bifurcation", label: "leftM1Bifurcation" },
  { value: "leftM2Inferior", label: "leftM2Inferior" },
  { value: "leftM2Superior", label: "leftM2Superior" },
]

export const BrainArteries = () => {
  const { t } = useStructureTranslation()

  return <FieldGraphics title={t("BrainArteries.title")} svg={<BrainArteriesSvg />} labels={{}} />
}
