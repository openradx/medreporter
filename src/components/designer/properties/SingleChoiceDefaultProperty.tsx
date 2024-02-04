import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { SingleChoiceFieldNode } from "~/schemas/structure"
import { SelectMetaProperty } from "./SelectMetaProperty"

interface SingleChoiceDefaultPropertyProps {
  node: SingleChoiceFieldNode
}

export const SingleChoiceDefaultProperty = ({ node }: SingleChoiceDefaultPropertyProps) => {
  const { t } = useSiteTranslation()

  return (
    <SelectMetaProperty
      name="default"
      label={t("SingleChoiceDefaultProperty.label")}
      data={node.options}
    />
  )
}
