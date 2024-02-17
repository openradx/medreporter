import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { MultipleChoiceFieldNode } from "~/schemas/structure"
import { MultiSelectPropertyInput } from "./MultiSelectPropertyInput"

interface MultipleChoiceDefaultPropertyProps {
  node: MultipleChoiceFieldNode
}

export const MultipleChoiceDefaultProperty = ({ node }: MultipleChoiceDefaultPropertyProps) => {
  const { t } = useSiteTranslation()

  return (
    <MultiSelectPropertyInput
      name="default"
      label={t("MultipleChoiceDefaultProperty.label")}
      node={node}
    />
  )
}
