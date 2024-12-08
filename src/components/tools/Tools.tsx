import { Grid } from "@mantine/core"
import { Route } from "nextjs-routes"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ToolCard } from "./ToolCard"

interface Tool {
  route: Route
  title: string
  description: string
  tags: string[]
}

export const Tools = () => {
  const { t } = useSiteTranslation()

  const tools: Tool[] = [
    {
      route: { pathname: "/tools/sandbox" },
      title: t("Sandbox.title"),
      description: t("Sandbox.description"),
      tags: [t("tags.radiology")],
    },
  ]

  return (
    <Grid>
      {tools
        .sort((tool1, tool2) => tool1.title.localeCompare(tool2.title))
        .map((tool) => (
          <Grid.Col key={tool.route.pathname} span={{ base: 12, md: 6, lg: 4 }}>
            <ToolCard
              route={tool.route}
              title={tool.title}
              description={tool.description}
              tags={tool.tags}
            />
          </Grid.Col>
        ))}
    </Grid>
  )
}
