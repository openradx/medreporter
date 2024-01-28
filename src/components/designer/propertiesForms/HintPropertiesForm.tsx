import { Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { HintNode, hintNodeSchema } from "~/schemas/structure"
import { HiddenProperty } from "../properties/HiddenProperty"
import { LevelProperty } from "../properties/LevelProperty"
import { PropertiesForm } from "./PropertiesForm"

interface HintPropertiesFormProps {
  node: HintNode
}

export const HintPropertiesForm = ({ node }: HintPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={hintNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
    <Controller
      name="content"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea
          label="Content"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
    <HiddenProperty />
    <LevelProperty />
  </PropertiesForm>
)
