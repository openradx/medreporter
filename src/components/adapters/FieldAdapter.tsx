import {
  BinaryFieldElement,
  DateFieldElement,
  FreeTextFieldElement,
  MeasurementsFieldElement,
  MultipleChoiceFieldElement,
  NumberFieldElement,
  SingleChoiceFieldElement,
} from "@medreporter/medtl-schema"
import { ContextData } from "@medreporter/medtl-tools"
import { SupportedLanguage } from "~/types/general"
import { BinaryFieldAdapter } from "./BinaryFieldAdapter"
import { DateFieldAdapter } from "./DateFieldAdapter"
import { FreeTextFieldAdapter } from "./FreeTextFieldAdapter"
import { MeasurementsFieldAdapter } from "./MeasurementsFieldAdapter"
import { MultipleChoiceFieldAdapter } from "./MultipleChoiceFieldAdapter"
import { NumberFieldAdapter } from "./NumberFieldAdapter"
import { SingleChoiceFieldAdapter } from "./SingleChoiceFieldAdapter"

type FieldElement =
  | BinaryFieldElement
  | DateFieldElement
  | FreeTextFieldElement
  | MeasurementsFieldElement
  | MultipleChoiceFieldElement
  | NumberFieldElement
  | SingleChoiceFieldElement

interface FieldAdapterProps {
  element: FieldElement
  data: ContextData
  lng: SupportedLanguage
}

export const FieldAdapter = ({ element, data, lng }: FieldAdapterProps) => {
  switch (element.kind) {
    case "BinaryField": {
      return <BinaryFieldAdapter {...{ element, data, lng }} />
    }
    case "DateField": {
      return <DateFieldAdapter {...{ element, data, lng }} />
    }
    case "FreeTextField": {
      return <FreeTextFieldAdapter {...{ element, data, lng }} />
    }
    case "MeasurementsField": {
      return <MeasurementsFieldAdapter {...{ element, data, lng }} />
    }
    case "MultipleChoiceField": {
      return <MultipleChoiceFieldAdapter {...{ element, data, lng }} />
    }
    case "NumberField": {
      return <NumberFieldAdapter {...{ element, data, lng }} />
    }
    case "SingleChoiceField": {
      return <SingleChoiceFieldAdapter {...{ element, data, lng }} />
    }
    default: {
      throw new Error(`Invalid element: ${element}`)
    }
  }
}
