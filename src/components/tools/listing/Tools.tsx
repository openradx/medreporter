import { Grid } from "@mantine/core"
import { useSiteTranslation } from "../../../hooks/useSiteTranslation"
import { ToolCard } from "./ToolCard"

interface Tool {
  url: string
  title: string
  description: string
  tags?: string[]
}

const tools: Tool[] = [
  {
    url: "/tools/sandbox",
    title: "Sandbox.title",
    description: "Sandbox.description",
    tags: ["tags.radiology"],
  },
  {
    url: "/tools/adrenal-washout",
    title: "AdrenalWashout.title",
    description: "AdrenalWashout.description",
    tags: ["tags.radiology", "tags.ct", "tags.adrenal"],
  },
  {
    url: "/tools/fleischner2017",
    title: "Fleischner2017.title",
    description: "Fleischner2017.description",
    tags: ["tags.radiology", "tags.ct", "tags.lung"],
  },
]

export const Tools = () => {
  const { t } = useSiteTranslation("tools")

  const preparedTools: Required<Tool>[] = tools
    .map((tool) => ({
      url: tool.url,
      title: t(tool.title),
      description: t(tool.description),
      tags: (tool.tags ?? []).map((tag) => t(tag)),
    }))
    .sort((tool1, tool2) => tool1.title.localeCompare(tool2.title))

  return (
    <Grid>
      {preparedTools.map((tool) => (
        <Grid.Col key={tool.url} sm={12} md={6} lg={4}>
          <ToolCard
            url={tool.url}
            title={tool.title}
            description={tool.description}
            tags={tool.tags}
          />
        </Grid.Col>
      ))}
    </Grid>
  )
}
