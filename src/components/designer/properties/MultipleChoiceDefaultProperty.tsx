import { MultiSelect } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { MultipleChoiceFieldNode } from "~/schemas/structure"

interface MultipleChoiceDefaultPropertyProps {
  node: MultipleChoiceFieldNode
}
export const MultipleChoiceDefaultProperty = ({
  node,
}: MultipleChoiceDefaultPropertyProps & { node: MultipleChoiceFieldNode }) => {
  const { t } = useSiteTranslation()
  return (
    <Controller
      name="default"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <MultiSelect
          label={t("MultipleChoiceDefaultProperty.label")}
          data={node.options}
          value={value}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
  )
}
