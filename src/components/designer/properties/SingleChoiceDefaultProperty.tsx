import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { SingleChoiceFieldNode } from "~/schemas/structure"
import { SelectPropertyInput } from "./SelectPropertyInput"

interface SingleChoiceDefaultPropertyProps {
  node: SingleChoiceFieldNode
}

export const SingleChoiceDefaultProperty = ({ node }: SingleChoiceDefaultPropertyProps) => {
  const { t } = useSiteTranslation()

  return (
    <SelectPropertyInput
      name="default"
      label={t("SingleChoiceDefaultProperty.label")}
      data={node.options}
    />
  )
}
