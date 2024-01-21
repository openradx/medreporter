import { TextInput, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { StatementNode, statementNodeSchema } from "~/schemas/report"
import { HiddenProperty } from "../properties/HiddenProperty"
import { PropertiesForm } from "./PropertiesForm"

interface StatementPropertiesFormProps {
  node: StatementNode
}

export const StatementPropertiesForm = ({ node }: StatementPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={statementNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
    <Controller
      name="link"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextInput label="Link" value={value} onChange={onChange} error={error?.message} />
      )}
    />
    <Controller
      name="content"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea label="Content" value={value} onChange={onChange} error={error?.message} />
      )}
    />
    <HiddenProperty />
  </PropertiesForm>
)
