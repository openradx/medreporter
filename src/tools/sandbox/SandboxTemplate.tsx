import { Template } from "~/components/template/Template"
import { SandboxReport } from "./SandboxReport"
import { SandboxStructure } from "./SandboxStructure"

export const SandboxTemplate = () => (
  <Template title="Sandbox" name="sandbox">
    <SandboxStructure />
    <SandboxReport />
  </Template>
)
