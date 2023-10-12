import { evalCodeToBoolean } from "~/medtl/interpreter"
import { SingleChoiceFieldEl } from "~/schemas/structure"
import { SingleChoiceField } from "../fields/SingleChoiceField"
import { Figure } from "../template/Figure"
import { Info } from "../template/Info"

interface SingleChoiceFieldAdapterProps {
  element: SingleChoiceFieldEl
}

export const SingleChoiceFieldAdapter = ({ element }: SingleChoiceFieldAdapterProps) => {
  const extras = (
    <>
      {element.info?.trim() && <Info>{element.info}</Info>}
      {element.figure?.trim() && <Figure>{element.figure}</Figure>}
    </>
  )
  return (
    <SingleChoiceField
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
