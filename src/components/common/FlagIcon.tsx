import DE from "flag-icons/flags/4x3/de.svg"
import US from "flag-icons/flags/4x3/us.svg"
import { MdOutlineTranslate as LanguageIcon } from "react-icons/md"
import { TbBug } from "react-icons/tb"

const images: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  de: DE,
  "en-US": US,
}

interface FlagIconProps {
  code: string
  size?: number
}

export const FlagIcon = ({ code, size = 18 }: FlagIconProps) => {
  if (code === "as_site") {
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