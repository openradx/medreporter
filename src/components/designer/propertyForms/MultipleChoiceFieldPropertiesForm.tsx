import { Input, Select } from "@mantine/core"
import { Controller } from "react-hook-form"
import { MultipleChoiceFieldNode, multipleChoiceFieldNodeSchema } from "~/schemas/structure"
import { OptionsEditorButton } from "../optionsEditor/OptionsEditorButton"
import { DisabledProperty } from "../properties/DisabledProperty"
import { FieldIdProperty } from "../properties/FieldIdProperty"
import { FigureProperty } from "../properties/FigureProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { InfoProperty } from "../properties/InfoProperty"
import { LabelProperty } from "../properties/LabelProperty"
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
    <LabelProperty />
    <FieldIdProperty />
    <InfoProperty />
    <DisabledProperty />
    <HiddenProperty />
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
    <FigureProperty />
    <Controller
      name="options"
      render={({ fieldState: { error } }) => (
        <Input.Wrapper label="Options" error={error?.message}>
          <OptionsEditorButton node={node} />
        </Input.Wrapper>
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
