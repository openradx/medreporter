import { Select, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { HintNode, hintNodeSchema } from "~/schemas/structure"
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
    <Controller
      name="level"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Select
          label="level"
          value={value}
          onChange={onChange}
          data={[
            { label: "Info", value: "info" },
            { label: "Warning", value: "warning" },
            { label: "Error", value: "error" },
          ]}
          error={error ? error.message : null}
        />
      )}
    />
  </PropertiesForm>
)
