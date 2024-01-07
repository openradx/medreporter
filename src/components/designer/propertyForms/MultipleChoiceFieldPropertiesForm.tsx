import { Select, TextInput, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { MultipleChoiceFieldNode, multipleChoiceFieldNodeSchema } from "~/schemas/structure"
import { PropertiesForm } from "./PropertiesForm"

interface MultipleChoiceFieldPropertiesFormProps {
  node: MultipleChoiceFieldNode
}

export const MultipleChoiceFieldPropertiesForm = ({
  node,
}: MultipleChoiceFieldPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={multipleChoiceFieldNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
    <Controller
      name="label"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextInput label="Label" value={value} onChange={onChange} error={error?.message} />
      )}
    />
    <Controller
      name="fieldId"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextInput label="Field ID" value={value} onChange={onChange} error={error?.message} />
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
      name="variant"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Select
          label="Variant"
          value={value}
          onChange={onChange}
          data={[
            { label: "Select", value: "select" },
            { label: "Radio", value: "radio" },
          ]}
          error={error?.message}
        />
      )}
    />
    <Controller
      name="figure"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea label="Figure" value={value} onChange={onChange} error={error?.message} />
      )}
    />
    <Controller
      name="options"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea label="Options" value={value} onChange={onChange} error={error?.message} />
      )}
    />
    <Controller
      name="default"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Select
          label="Default value"
          value={value}
          onChange={onChange}
          data={node.options}
          error={error?.message}
        />
      )}
    />
  </PropertiesForm>
)
