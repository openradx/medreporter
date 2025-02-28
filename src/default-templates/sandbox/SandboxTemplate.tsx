import { Template } from "~/components/template/Template"
import { SandboxReport } from "./SandboxReport"
import { SandboxStructure } from "./SandboxStructure"

export const SandboxTemplate = () => (
  <Template slug="sandbox" title="Sandbox">
    <SandboxStructure />
    <SandboxReport />
  </Template>
)
