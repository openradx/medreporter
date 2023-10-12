import { evalCodeToBoolean } from "~/medtl/interpreter"
import { MultipleChoiceFieldEl } from "~/schemas/structure"
import { MultipleChoiceField } from "../fields/MultipleChoiceField"
import { Figure } from "../template/Figure"
import { Info } from "../template/Info"

interface MultipleChoiceFieldAdapterProps {
  element: MultipleChoiceFieldEl
}

export const MultipleChoiceFieldAdapter = ({ element }: MultipleChoiceFieldAdapterProps) => {
  const extras = (
    <>
      {element.info?.trim() && <Info>{element.info}</Info>}
      {element.figure?.trim() && <Figure>{element.figure}</Figure>}
    </>
  )
  return (
    <MultipleChoiceField
      id={element.id}
      label={element.label}
      extras={extras}
      disabled={evalCodeToBoolean(element.disabled)}
      hidden={evalCodeToBoolean(element.hidden)}
      options={element.options}
      defaultValue={element.default}
    />
  )
}
