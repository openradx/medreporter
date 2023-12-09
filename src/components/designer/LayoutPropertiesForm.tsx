import { Select } from "@mantine/core"
import { Controller } from "react-hook-form"
import { LayoutNode, layoutLazyNodeSchema } from "~/schemas/structure"
import { PropertyForm } from "./PropertiesForm"

interface LayoutPropertiesFormProps {
  node: LayoutNode
}

export const LayoutPropertiesForm = ({ node }: LayoutPropertiesFormProps) => (
  <PropertyForm
    nodeId={node.nodeId}
    schema={layoutLazyNodeSchema.omit({ nodeId: true, type: true, children: true })}
    initialValues={node}
  >
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
  </PropertyForm>
)
