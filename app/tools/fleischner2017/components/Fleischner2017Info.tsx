import { Stack } from "@mantine/core"
import { Citation } from "../../../core/components/common/Citation"
import { InfoTab } from "../../../core/components/structuredReport/InfoTab"
import { ModuleInfo } from "../../../core/components/structuredReport/ModuleInfo"

export const Fleischner2017Info = () => (
  <ModuleInfo>
    <InfoTab title="Measurement/reporting">
      <Stack>
        <ul>
          <li>Images should be acquired in full inspiration and reconstructed in thin slice.</li>
          <li>
            Nodules should be measured on axial plane in lung window. Sagittal or coronal plane may
            be used if the longest diameters lie in those planes.
          </li>
          <li>
            When multiple nodules are present, only the largest or morphologically most suspicious
            need to be measured and have their location(s) reported.
          </li>
          <li>
            Typical perifissural nodules (triangular or oval in the axial plane, and flat or
            lentiform in the sagittal and coronal planes) not necessarily require follow-up even if
            measuring greater than 6 mm.
          </li>
          <li>
            Reporting:
            <ul>
              <li>
                Nodules smaller than 3 mm should not be measured and should be described as
                micronodules.
              </li>
              <li>
                Nodules between 3 and 10 mm should be specified with the average of short and long
                axis.
              </li>
              <li>
                Nodules bigger than 10 mm an masses should be described in long and short axis
                separately.
              </li>
              <li>
                In part-solid nodules solid components over 3 mm should have the maximal diameter
                reported
              </li>
            </ul>
          </li>
        </ul>
      </Stack>
    </InfoTab>
    <InfoTab title="References">
      <Stack>
        <Citation
          title="Guidelines for Management of Incidental Pulmonary Nodules Detected on CT Images: From the Fleischner Society 2017"
          authors="Heber MacMahon, David P. Naidich, Jin Mo Goo, Kyung Soo Lee, Ann N. C. Leung, John R. Mayo, Atul C. Mehta, Yoshiharu Ohno, Charles A. Powell, Mathias Prokop, Geoffrey D. Rubin, Cornelia M. Schaefer-Prokop, William D. Travis, Paul E. Van Schil, and Alexander A. Bankier"
          journal="Radiology 2017 284:1, 228-243"
        />
      </Stack>
    </InfoTab>
  </ModuleInfo>
)
