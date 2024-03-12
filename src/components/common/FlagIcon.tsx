import DE from "flag-icons/flags/4x3/de.svg"
import GB from "flag-icons/flags/4x3/gb.svg"
import {
  Languages as TranslationIcon,
  Bug as CiModeIcon,
  CircleHelp as OtherIcon,
  LucideIcon,
} from "lucide-react"

// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
// https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
const flagIcons: { [language: string]: LucideIcon } = {
  cimode: CiModeIcon,
  asSite: TranslationIcon,
  other: OtherIcon,
  de: DE,
  en: GB,
}

interface FlagImageProps {
  language: string
  size?: number
}

export const FlagIcon = ({ language, size = 18 }: FlagImageProps) => {
  const Img = flagIcons[language]
  if (!Img) {
    throw new Error(`Missing flag for language: ${language}`)
  }
  return <Img width={size} height={size} />
}
