import { Select, Switch, TextInput, Textarea } from "@mantine/core"
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
      name="label"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextInput label="Label" value={value} onChange={onChange} error={error?.message} />
      )}
    />
    <Controller
      name="info"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea label="Info" value={value} onChange={onChange} error={error?.message} />
      )}
    />
    <Controller
      name="disabled"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea label="Disabled" value={value} onChange={onChange} error={error?.message} />
      )}
    />
    <Controller
      name="hidden"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea label="Hidden" value={value} onChange={onChange} error={error?.message} />
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
          error={error?.message}
        />
      )}
    />
    <Controller
      name="justify"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Select
          label="Justify"
          value={value}
          onChange={onChange}
          data={[
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
            { label: "Space Between", value: "space-between" },
            { label: "Space Around", value: "space-around" },
          ]}
          error={error?.message}
        />
      )}
    />
    <Controller
      name="border"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Switch label="Border" value={value} onChange={onChange} error={error?.message} />
      )}
    />
  </PropertiesForm>
)
