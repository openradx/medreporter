import { Select, Switch, TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"
import { GroupNode, groupNodeSchema } from "~/schemas/structure"
import { PropertiesForm } from "./PropertiesForm"

interface GroupPropertiesFormProps {
  node: GroupNode
}

export const GroupPropertiesForm = ({ node }: GroupPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={groupNodeSchema.omit({ nodeId: true, type: true, children: true })}
    initialValues={node}
  >
    <Controller
      name="border"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Switch
          label="Border"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
    <Controller
      name="label"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextInput
          label="Label"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
    <Controller
      name="direction"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Select
          label="Direction"
          value={value}
          onChange={onChange}
          data={[
            { label: "Row", value: "row" },
            { label: "Column", value: "column" },
          ]}
          error={error ? error.message : null}
        />
      )}
    />
  </PropertiesForm>
)
