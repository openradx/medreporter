import { Group } from "@mantine/core"
import { ExternalLink, ExternalLinkProps } from "./ExternalLink"

interface ExternalLinksProps {
  links: ExternalLinkProps[]
}

export const ExternalLinks = ({ links }: ExternalLinksProps) => (
  <Group>
    {links.map(({ url, title }) => (
      <ExternalLink key={url} url={url} title={title} />
    ))}
  </Group>
)
