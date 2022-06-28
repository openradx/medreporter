import ArteriesBrain from "../../../../public/images/arteriesBrain.svg"
import BonesFeetBothSides from "../../../../public/images/bonesFeetBothSides.svg"
import { DateField } from "../../fields/DateField"
import { FreeTextField } from "../../fields/FreeTextField"
import { MultipleChoiceField } from "../../fields/MultipleChoiceField"
import { NumberField } from "../../fields/NumberField"
import { SingleChoiceField } from "../../fields/SingleChoiceField"
import { SelectOverlay } from "../../structuredReport/SelectOverlay"

export const SandboxStructure = () => {
  const optionsArteries = [
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

  const mappingArteries = {
    basilaris: "basilaris",
    basilarisHead: "basilarisHead",
    ACA: "ACA",
    rightV4: "rightV4",
    rightPICA: "rightPICA",
    rightSCA: "rightSCA",
    rightP1: "rightP1",
    rightP2: "rightP2",
    rightACP: "rightACP",
    rightA1: "rightA1",
    rightA2: "rightA2",
    rightACMT: "rightACMT",
    rightM1Proximal: "rightM1Proximal",
    rightM1Distal: "rightM1Distal",
    rightM1Bifurcation: "rightM1Bifurcation",
    rightM2Inferior: "rightM2Inferior",
    rightM2Superior: "rightM2Superior",
    leftV4: "leftV4",
    leftPICA: "leftPICA",
    leftSCA: "leftSCA",
    leftP1: "leftP1",
    leftP2: "leftP2",
    leftACP: "leftACP",
    leftA1: "leftA1",
    leftA2: "leftA2",
    leftACMT: "leftACMT",
    leftM1Proximal: "leftM1Proximal",
    leftM1Distal: "leftM1Distal",
    leftM1Bifurcation: "leftM1Bifurcation",
    leftM2Inferior: "leftM2Inferior",
    leftM2Superior: "leftM2Superior",
  }

  return (
    <>
      <DateField id="date" label="Todays date" />
      <NumberField id="number" label="Random number" min={100} max={1000} />
      <SingleChoiceField
        id="arteries"
        label="Arteries of the brain"
        variant="select"
        options={optionsArteries}
        extras={<SelectOverlay svgImage={<ArteriesBrain />} mapping={mappingArteries} />}
      />
      <MultipleChoiceField
        id="bones_feet"
        label="Bones of the feet"
        variant="select"
        extras={<SelectOverlay svgImage={<BonesFeetBothSides />} />}
      />
      <FreeTextField id="text" label="Some text" variant="multiline" />
    </>
  )
}
