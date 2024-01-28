import { TextInput, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { ParagraphNode, paragraphNodeSchema } from "~/schemas/report"
import { HiddenProperty } from "../properties/HiddenProperty"
import { ListProperty } from "../properties/ListProperty"
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
        <TextInput label="Link" value={value} onChange={onChange} error={error?.message} />
      )}
    />
    <Controller
      name="title"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea label="Title" value={value} onChange={onChange} error={error?.message} />
      )}
    />
    <HiddenProperty />
    <ListProperty />
  </PropertiesForm>
)
