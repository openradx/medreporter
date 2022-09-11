import DE from "flag-icons/flags/4x3/de.svg"
import US from "flag-icons/flags/4x3/us.svg"
import { MdOutlineTranslate as LanguageIcon } from "react-icons/md"
import { TbBug } from "react-icons/tb"

type SVGComponent = React.FC<React.SVGProps<SVGSVGElement>>

const images: Record<string, SVGComponent> = {
  de: DE,
  "en-US": US,
}

const languageCodesToCountry = {
  en: "gb",
}

function getCountryCode(languageCode: string): string {
  const match = Array.from(languageCode.trim().matchAll(/^([a-zA-Z]{2})(?:-([a-zA-Z]{2}))?$/))
  // let code: string = (match[0]?[2] ?? match[0]?[1]) ?? "other"
  // if (code in languageCodesToCountry) {
  // code = languageCodesToCountry[code]
  // }
  return ""
}

interface FlagIconProps {
  code: string
  size?: number
}

export const FlagImage = ({ code, size = 18 }: FlagIconProps) => {
  if (code === "asSite") {
    return <LanguageIcon size={size} />
  }

  if (code === "cimode") {
    return <TbBug size={size} />
  }

  const Image = images[code]
  if (Image === undefined) {
    throw new Error(`Missing flag for code: ${code}`)
  }
  return <Image width={size} height={size} />
}
