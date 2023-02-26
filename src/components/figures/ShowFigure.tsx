import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { selectResource } from "~/state/resourcesSlice"
import { useAppSelector } from "~/state/store"
import { SupportedLanguage } from "~/types/general"
import { FigureShowcase } from "./FigureShowcase"

interface ShowFigureProps {
  resourceId: string
}

export const ShowFigure = ({ resourceId }: ShowFigureProps) => {
  const { i18n } = useSiteTranslation()
  const resource = useAppSelector(selectResource(resourceId))

  return <FigureShowcase figure={resource} defaultLng={i18n.language as SupportedLanguage} />
}
