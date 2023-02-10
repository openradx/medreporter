import DE from "flag-icons/flags/4x3/de.svg"
import ES from "flag-icons/flags/4x3/es.svg"
import FR from "flag-icons/flags/4x3/fr.svg"
import GB from "flag-icons/flags/4x3/gb.svg"
import IT from "flag-icons/flags/4x3/it.svg"
import NL from "flag-icons/flags/4x3/nl.svg"
import PT from "flag-icons/flags/4x3/pt.svg"
import SE from "flag-icons/flags/4x3/se.svg"
import US from "flag-icons/flags/4x3/us.svg"
import { MdOutlineTranslate as TranslationIcon } from "react-icons/md"
import { TbBug as CiModeIcon, TbQuestionMark as OtherIcon } from "react-icons/tb"
import { SupportedLanguageOption } from "~/types/general"

type SVGComponent = React.FC<React.SVGProps<SVGSVGElement>>

// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
// https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
const flagIcons: { [language in SupportedLanguageOption]: SVGComponent } = {
  cimode: CiModeIcon,
  asSite: TranslationIcon,
  other: OtherIcon,
  de: DE,
  en: GB,
  "en-US": US,
  es: ES,
  fr: FR,
  it: IT,
  nl: NL,
  pt: PT,
  sv: SE,
}

interface FlagImageProps {
  language: SupportedLanguageOption
  size?: number
}

export const FlagIcon = ({ language, size = 18 }: FlagImageProps) => {
  const Img = flagIcons[language]
  return <Img width={size} height={size} />
}