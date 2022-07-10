import { useStructureTranslation } from "../../hooks/useStructureTranslation"
import BrainArteriesSvg from "../../svg/BrainArteries.svg"
import { FieldGraphics } from "../structuredReport/FieldGraphics"

export const options = [
  { value: "leftM2Superior", label: "BrainArteries.leftM2Superior" },
  { value: "leftM2Inferior", label: "BrainArteries.leftM2Inferior" },
  {
    value: "leftM1Bifurcation",
    label: "BrainArteries.leftM1Bifurcation",
  },
  { value: "leftM1Distal", label: "BrainArteries.leftM1Distal" },
  { value: "leftM1Proximal", label: "BrainArteries.leftM1Proximal" },
  { value: "leftACMT", label: "BrainArteries.leftACMT" },
  { value: "leftA1", label: "BrainArteries.leftA1" },
  { value: "leftA2", label: "BrainArteries.leftA2" },
  { value: "leftACI", label: "BrainArteries.leftACI" },
  { value: "leftACP", label: "BrainArteries.leftACP" },
  { value: "leftP2", label: "BrainArteries.leftP2" },
  { value: "leftP1", label: "BrainArteries.leftP1" },
  { value: "leftSCA", label: "BrainArteries.leftSCA" },
  { value: "leftAICA", label: "BrainArteries.leftAICA" },
  { value: "leftPICA", label: "BrainArteries.leftPICA" },
  { value: "leftV4", label: "BrainArteries.leftV4" },
  { value: "rightM2Superior", label: "BrainArteries.rightM2Superior" },
  { value: "rightM2Inferior", label: "BrainArteries.rightM2Inferior" },
  {
    value: "rightM1Bifurcation",
    label: "BrainArteries.rightM1Bifurcation",
  },
  { value: "rightM1Distal", label: "BrainArteries.rightM1Distal" },
  { value: "rightM1Proximal", label: "BrainArteries.rightM1Proximal" },
  { value: "rightACMT", label: "BrainArteries.rightACMT" },
  { value: "rightA1", label: "BrainArteries.rightA1" },
  { value: "rightA2", label: "BrainArteries.rightA2" },
  { value: "rightACI", label: "BrainArteries.rightACI" },
  { value: "rightACP", label: "BrainArteries.rightACP" },
  { value: "rightP2", label: "BrainArteries.rightP2" },
  { value: "rightP1", label: "BrainArteries.rightP1" },
  { value: "rightSCA", label: "BrainArteries.rightSCA" },
  { value: "rightAICA", label: "BrainArteries.rightAICA" },
  { value: "rightPICA", label: "BrainArteries.rightPICA" },
  { value: "rightV4", label: "BrainArteries.rightV4" },
  { value: "ACA", label: "BrainArteries.ACA" },
  { value: "basilarisHead", label: "BrainArteries.basilarisHead" },
  { value: "basilaris", label: "BrainArteries.basilaris" },
]

export const BrainArteries = () => {
  const { t } = useStructureTranslation()

  return <FieldGraphics title={t("BrainArteries.title")} svg={<BrainArteriesSvg />} labels={{}} />
}
