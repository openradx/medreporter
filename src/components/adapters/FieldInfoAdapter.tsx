import { InfoElement } from "@medreporter/medtl-schema"
import { ContextData } from "@medreporter/medtl-tools"
import { getFieldContext } from "~/contexts/FieldContext"
import { SupportedLanguage } from "~/types/general"
import { FieldInfo } from "../sr/FieldInfo"
import { TextContentAdapter } from "./TextContentAdapter"

interface FieldInfoAdapterProps {
  element: InfoElement
  data: ContextData
  lng: SupportedLanguage
}

export const FieldInfoAdapter = ({ element, data, lng }: FieldInfoAdapterProps) => {
  const { useField } = getFieldContext()
  const { label } = useField()

  return (
    <FieldInfo title={label ?? "-"}>
      <TextContentAdapter format="html" {...{ element, data, lng }} />
    </FieldInfo>
  )
}
