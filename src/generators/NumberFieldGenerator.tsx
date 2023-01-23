import { NumberFieldElement } from "@medreporter/medtl-schema"
import { ContextData, createContext, ElementWrapper } from "@medreporter/medtl-tools"
import { NumberField } from "~/components/fields/NumberField"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"

interface NumberFieldGeneratorProps {
  numberField: ElementWrapper<NumberFieldElement>
  contextData: ContextData
}

export const NumberFieldGenerator = ({ numberField, contextData }: NumberFieldGeneratorProps) => {
  const { currentStructureLanguage: lng } = useStructureTranslation()
  const context = createContext(contextData, lng)

  const id = numberField.getAttribute("id").getStringValue()
  const label = numberField.getFirstChildElement("Label").getTextContent(context)
  const visible = numberField.getAttribute("visible")?.getBooleanValue(context)
  const enabled = numberField.getAttribute("enabled")?.getBooleanValue(context)
  const defaultValue = numberField.getAttribute("default")?.getNumberValue(context)
  const min = numberField.getAttribute("min")?.getNumberValue(context)
  const max = numberField.getAttribute("max")?.getNumberValue(context)
  const precision = numberField.getAttribute("precision")?.getNumberValue(context)
  const step = numberField.getAttribute("step")?.getNumberValue(context)
  const startValue = numberField.getAttribute("start")?.getNumberValue(context)

  return (
    <NumberField
      id={id}
      label={label}
      visible={visible}
      enabled={enabled}
      defaultValue={defaultValue}
      min={min}
      max={max}
      precision={precision}
      step={step}
      startValue={startValue}
    />
  )
}
