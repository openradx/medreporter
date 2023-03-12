import {
  BooleanElement,
  DateElement,
  FreeTextElement,
  MeasurementsElement,
  MultipleChoiceElement,
  NumberElement,
  SingleChoiceElement,
  TimeElement,
} from "@medreporter/medtl-schema"
import { ContextData } from "@medreporter/medtl-tools"
import { SupportedLanguage } from "~/types/general"
import { BooleanAdapter } from "./BooleanAdapter"
import { DateAdapter } from "./DateAdapter"
import { FreeTextAdapter } from "./FreeTextAdapter"
import { MeasurementsAdapter } from "./MeasurementsAdapter"
import { MultipleChoiceAdapter } from "./MultipleChoiceAdapter"
import { NumberAdapter } from "./NumberAdapter"
import { SingleChoiceAdapter } from "./SingleChoiceAdapter"
import { TimeAdapter } from "./TimeAdapter"

type FieldElement =
  | BooleanElement
  | DateElement
  | TimeElement
  | FreeTextElement
  | MeasurementsElement
  | MultipleChoiceElement
  | NumberElement
  | SingleChoiceElement

interface FieldAdapterProps {
  element: FieldElement
  data: ContextData
  lng: SupportedLanguage
}

export const FieldAdapter = ({ element, data, lng }: FieldAdapterProps) => {
  switch (element.kind) {
    case "Boolean": {
      return <BooleanAdapter {...{ element, data, lng }} />
    }
    case "Date": {
      return <DateAdapter {...{ element, data, lng }} />
    }
    case "Time": {
      return <TimeAdapter {...{ element, data, lng }} />
    }
    case "FreeText": {
      return <FreeTextAdapter {...{ element, data, lng }} />
    }
    case "Measurements": {
      return <MeasurementsAdapter {...{ element, data, lng }} />
    }
    case "MultipleChoice": {
      return <MultipleChoiceAdapter {...{ element, data, lng }} />
    }
    case "Number": {
      return <NumberAdapter {...{ element, data, lng }} />
    }
    case "SingleChoice": {
      return <SingleChoiceAdapter {...{ element, data, lng }} />
    }
    default: {
      throw new Error(`Invalid element: ${element}`)
    }
  }
}
