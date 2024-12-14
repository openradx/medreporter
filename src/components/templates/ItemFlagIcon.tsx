import { ActionIcon } from "@mantine/core"
import DE from "flag-icons/flags/4x3/de.svg"
import GB from "flag-icons/flags/4x3/gb.svg"
import { CircleHelp as OtherIcon, LucideIcon } from "lucide-react"

const flagIcons: { [language: string]: LucideIcon } = {
  de: DE,
  en: GB,
}

interface FlagImageProps {
  language: string
}

export const ItemFlagIcon = ({ language }: FlagImageProps) => {
  let Img = flagIcons[language]
  if (!Img) {
    Img = OtherIcon
  }
  return (
    <ActionIcon size="lg" variant="default" p={4}>
      <Img />
    </ActionIcon>
  )
}
