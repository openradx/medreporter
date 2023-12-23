import { Switch, TextInput, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { ParagraphNode, paragraphNodeSchema } from "~/schemas/report"
import { PropertiesForm } from "./PropertiesForm"

interface ParagraphPropertiesFormProps {
  node: ParagraphNode
}

export const ParagraphPropertiesForm = ({ node }: ParagraphPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={paragraphNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
    <Controller
      name="link"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextInput
          label="Link"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
    <Controller
      name="title"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea
          label="Title"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
    <Controller
      name="hidden"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea
          label="Hidden"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
    <Controller
      name="list"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Switch
          label="List"
          labelPosition="left"
          checked={!!value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
  </PropertiesForm>
)
