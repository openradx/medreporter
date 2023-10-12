import { DiscreteFieldEl } from "~/schemas/structure"
import { BooleanFieldAdapter } from "./BooleanFieldAdapter"
import { DateFieldAdapter } from "./DateFieldAdapter"
import { FreeTextFieldAdapter } from "./FreeTextFieldAdapter"
import { MeasurementsFieldAdapter } from "./MeasurementsFieldAdapter"
import { MultipleChoiceFieldAdapter } from "./MultipleChoiceFieldAdapter"
import { NumberFieldAdapter } from "./NumberFieldAdapter"
import { SingleChoiceFieldAdapter } from "./SingleChoiceFieldAdapter"
import { TimeFieldAdapter } from "./TimeFieldAdapter"

interface DiscreteFieldAdapterProps {
  element: DiscreteFieldEl
}

export const DiscreteFieldAdapter = ({ element }: DiscreteFieldAdapterProps) => {
  switch (element.type) {
    case "BooleanField":
      return <BooleanFieldAdapter key={element.gid} element={element} />
    case "DateField":
      return <DateFieldAdapter key={element.gid} element={element} />
    case "FreeTextField":
      return <FreeTextFieldAdapter key={element.gid} element={element} />
    case "MeasurementsField":
      return <MeasurementsFieldAdapter key={element.gid} element={element} />
    case "MultipleChoiceField":
      return <MultipleChoiceFieldAdapter key={element.gid} element={element} />
    case "NumberField":
      return <NumberFieldAdapter key={element.gid} element={element} />
    case "SingleChoiceField":
      return <SingleChoiceFieldAdapter key={element.gid} element={element} />
    case "TimeField":
      return <TimeFieldAdapter key={element.gid} element={element} />
    default:
      // @ts-ignore
      throw new Error(`Invalid discrete field type: ${element.type}`)
  }
}
