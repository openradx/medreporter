import DE from "flag-icons/flags/4x3/de.svg"
import ES from "flag-icons/flags/4x3/es.svg"
import FR from "flag-icons/flags/4x3/fr.svg"
import GB from "flag-icons/flags/4x3/gb.svg"
import IT from "flag-icons/flags/4x3/it.svg"
import NL from "flag-icons/flags/4x3/nl.svg"
import PT from "flag-icons/flags/4x3/pt.svg"
import SE from "flag-icons/flags/4x3/se.svg"
import { MdOutlineTranslate as TranslationIcon } from "react-icons/md"
import { TbBug as CiModeIcon, TbQuestionMark as OtherIcon } from "react-icons/tb"

type SVGComponent = React.FC<React.SVGProps<SVGSVGElement>>

const flagImages: Record<string, SVGComponent> = {
  de: DE,
  es: ES,
  fr: FR,
  gb: GB,
  it: IT,
  nl: NL,
  pt: PT,
  se: SE,
}

interface FlagImageProps {
  countryCode: string
  size?: number
}

export const FlagImage = ({ countryCode, size = 18 }: FlagImageProps) => {
  if (countryCode === "asSite") {
    return <TranslationIcon size={size} />
  }

  if (countryCode === "cimode") {
    return <CiModeIcon size={size} />
  }

  if (!(countryCode in flagImages)) {
    return <OtherIcon size={size} />
  }

  const Image = flagImages[countryCode]
  if (Image === undefined) {
    throw new Error(`Missing country code '${countryCode}' to import flag.`)
  }
  return <Image width={size} height={size} />
}
