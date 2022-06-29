import { Box, Paper } from "@mantine/core"
import { ReactElement, ReactNode, useEffect, useRef } from "react"
import { useModule } from "../../contexts/ModuleContext"
import { useStructuredReport } from "../../contexts/StructuredReportContext"
import { selectScrollInto } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"
import { ActionsGroup } from "../common/ActionsGroup"
import { ExternalLink, ExternalLinkProps } from "./ExternalLink"
import { ModuleHeader } from "./ModuleHeader"

interface StructureProps {
  title: string
  links?: ExternalLinkProps[]
  info?: ReactElement
  children?: ReactNode
}

export const Structure = ({ title, links, info, children }: StructureProps) => {
  const { context } = useStructuredReport()
  const { id: moduleId } = useModule()
  const scrollInto = useAppSelector(selectScrollInto)
  const cardEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollInto && scrollInto.moduleId === moduleId && !scrollInto.fieldId) {
      cardEl.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [scrollInto, moduleId])

  if (context === "report") return null

  const actions =
    links?.map((link) => <ExternalLink key={link.url} url={link.url} title={link.title} />) ?? []

  return (
    <Paper ref={cardEl} shadow="md" withBorder>
      <ModuleHeader
        title={title}
        actions={
          <ActionsGroup>
            {actions}
            {info}
          </ActionsGroup>
        }
      />
      <Box sx={(theme) => ({ padding: theme.spacing.sm })}>{children}</Box>
    </Paper>
  )
}
