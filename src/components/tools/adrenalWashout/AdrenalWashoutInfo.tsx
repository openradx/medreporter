import { Stack } from "@mantine/core"
import { Citation } from "../../common/Citation"
import { InfoTab } from "../../structuredReport/InfoTab"
import { ModuleInfo } from "../../structuredReport/ModuleInfo"

export const AdrenalWashoutInfo = () => (
  <ModuleInfo title="Adrenal Washout">
    <InfoTab title="References">
      <Stack>
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
      </Stack>
    </InfoTab>
  </ModuleInfo>
)
