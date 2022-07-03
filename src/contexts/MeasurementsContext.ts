import { MeasurementsAction } from "../components/inputs/MeasurementsInput/measurementTypes"
import { createRequiredContext } from "../utils/createRequiredContext"

interface MeasurementsContext {
  dispatch: (action: MeasurementsAction) => void
}

export const [useMeasurements, MeasurementsContextProvider] =
  createRequiredContext<MeasurementsContext>("MeasurementsContext")
