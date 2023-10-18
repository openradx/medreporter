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
      route: { pathname: "/tools/adrenal-washout" },
      title: t("AdrenalWashout.title"),
      description: t("AdrenalWashout.description"),
      tags: [t("tags.radiology"), t("tags.ct"), t("tags.adrenal")],
    },
    {
      route: { pathname: "/tools/adrenal-mri" },
      title: t("AdrenalMri.title"),
      description: t("AdrenalMri.description"),
      tags: [t("tags.radiology"), t("tags.mri"), t("tags.adrenal")],
    },

    {
      route: { pathname: "/tools/fleischner2017" },
      title: t("Fleischner2017.title"),
      description: t("Fleischner2017.description"),
      tags: [t("tags.radiology"), t("tags.ct"), t("tags.lung")],
    },
    {
      route: { pathname: "/tools/gfr" },
      title: t("Gfr.title"),
      description: t("Gfr.description"),
      tags: [t("tags.kidney")],
    },
    {
      route: { pathname: "/tools/kidney-volume" },
      title: t("KidneyVolume.title"),
      description: t("KidneyVolume.description"),
      tags: [t("tags.kidney")],
    },
    {
      route: { pathname: "/tools/lung-rads2022" },
      title: t("LungRads2022.title"),
      description: t("LungRads2022.description"),
      tags: [t("tags.radiology"), t("tags.lung")],
    },
    {
      route: { pathname: "/tools/measurements-table" },
      title: t("MeasurementsTable.title"),
      description: t("MeasurementsTable.description"),
      tags: [t("tags.radiology")],
    },
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
          <Grid.Col key={tool.route.pathname} sm={12} md={6} lg={4}>
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
