import { Grid } from "@mantine/core"
import { useSiteTranslation } from "../../../core/hooks/useSiteTranslation"
import { ToolCard } from "./ToolCard"

interface Tool {
  url: string
  title: string
  description: string
  tags: string[]
}

export const Tools = () => {
  const { t } = useSiteTranslation()

  const tools: Tool[] = [
    {
      url: "/tools/adrenal-washout",
      title: t("AdrenalWashout.title"),
      description: t("AdrenalWashout.description"),
      tags: [t("tags.radiology"), t("tags.ct"), t("tags.adrenal")],
    },
    {
      url: "/tools/adrenal-mri",
      title: t("AdrenalMri.title"),
      description: t("AdrenalMri.description"),
      tags: [t("tags.radiology"), t("tags.mri"), t("tags.adrenal")],
    },

    {
      url: "/tools/fleischner2017",
      title: t("Fleischner2017.title"),
      description: t("Fleischner2017.description"),
      tags: [t("tags.radiology"), t("tags.ct"), t("tags.lung")],
    },
    {
      url: "/tools/gfr",
      title: t("Gfr.title"),
      description: t("Gfr.description"),
      tags: [t("tags.kidney")],
    },
    {
      url: "/tools/measurements-table",
      title: t("MeasurementsTable.title"),
      description: t("MeasurementsTable.description"),
      tags: [t("tags.radiology")],
    },
    {
      url: "/tools/sandbox",
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
