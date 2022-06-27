import { ActionIcon, Tooltip } from "@mantine/core"
import Image from "next/image"
import { BiLink as LinkIcon } from "react-icons/bi"

export interface ExternalLinkProps {
  url: string
  title: string
}

export const ExternalLink = ({ url, title }: ExternalLinkProps) => {
  let logo = ""
  if (url.includes("radiopaedia.org")) {
    logo = "/images/logo_radiopaedia.png"
  } else if (url.includes("radiologyassistant.nl")) {
    logo = "/images/logo_radiologyassistant.png"
  } else if (url.includes("amboss.com")) {
    logo = "/images/logo_amboss.png"
  } else if (url.includes("radiosurf.elearning.aum.iml.unibe.ch")) {
    logo = "/images/logo_radiosurf.png"
  } else if (url.includes("idr.med.uni-erlangen.de/orthorad")) {
    logo = "/images/logo_orthorad.png"
  }

  if (!title) title = url

  return (
    <ActionIcon
      variant="default"
      component="a"
      rel="noopener noreferrer"
      target="_blank"
      href={url}
    >
      <Tooltip label={title} position="bottom">
        <div>{logo ? <Image src={logo} alt={title} width={20} height={20} /> : <LinkIcon />}</div>
      </Tooltip>
    </ActionIcon>
  )
}
