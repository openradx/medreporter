import { useLingui } from "@lingui/react/macro"
import { SingleChoiceFieldNode } from "~/schemas/structure"
import { SelectPropertyInput } from "./SelectPropertyInput"

interface SingleChoiceDefaultPropertyProps {
  node: SingleChoiceFieldNode
}

export const SingleChoiceDefaultProperty = ({ node }: SingleChoiceDefaultPropertyProps) => {
  const { t } = useLingui()

  return <SelectPropertyInput name="default" label={t`Default`} data={node.options} />
}
