import { Box, Paper } from "@mantine/core"
import { ReactNode, useEffect, useRef } from "react"
import { useModule } from "../../contexts/ModuleContext"
import { useStructuredReport } from "../../contexts/StructuredReportContext"
import { selectScrollInto } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"
import { ActionsGroup } from "../common/ActionsGroup"
import { ExternalLink } from "./ExternalLink"
import { ModuleToolbar } from "./ModuleToolbar"

interface StructureProps {
  children?: ReactNode
}

export const Structure = ({ children }: StructureProps) => {
  const { context } = useStructuredReport()
  const { id, title, links, info } = useModule()
  const scrollInto = useAppSelector(selectScrollInto)
  const cardEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollInto && scrollInto.moduleId === id && !scrollInto.fieldId) {
      cardEl.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [scrollInto, id])

  if (context === "report") return null

  const actions =
    links?.map((link) => <ExternalLink key={link.url} url={link.url} title={link.title} />) ?? []

  const needsHeader = title || info || actions.length > 0

  return (
    <Paper ref={cardEl} shadow="md" withBorder>
      {needsHeader && (
        <ModuleToolbar
          title={title}
          actions={
            <ActionsGroup>
              {actions}
              {info}
            </ActionsGroup>
          }
        />
      )}
      <Box sx={(theme) => ({ padding: theme.spacing.sm })}>{children}</Box>
    </Paper>
  )
}
