import { selectResource } from "~/state/resourcesSlice"
import { useAppSelector } from "~/state/store"
import { FigureShowcase } from "./FigureShowcase"

interface ShowFigureProps {
  resourceId: string
}

export const ShowFigure = ({ resourceId }: ShowFigureProps) => {
  const resource = useAppSelector(selectResource(resourceId))

  return <FigureShowcase figure={resource} lng={"de" as const} />
}
