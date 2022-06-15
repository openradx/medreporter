import { Card, Text } from "@mantine/core"
import { ReactNode, useEffect, useRef } from "react"
import { useModule } from "../../contexts/ModuleContext"
import { useStructuredReport } from "../../contexts/StructuredReportContext"
import { useAppSelector } from "../../state/store"
import { selectScrollInto } from "../../state/structureSlice"
import { ExternalLink } from "../fields/fieldTypes"
import { ExternalLinks } from "./ExternalLinks"

const DEFAULT_EXTERNAL_LINKS: ExternalLink[] = []

interface StructureProps {
  externalLinks?: ExternalLink[]
  children: ReactNode
}

export const Structure = ({ externalLinks = DEFAULT_EXTERNAL_LINKS, children }: StructureProps) => {
  const { context } = useStructuredReport()
  const { id: moduleId, title: moduleTitle } = useModule()
  const scrollInto = useAppSelector(selectScrollInto)
  const cardEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollInto && scrollInto.moduleId === moduleId && !scrollInto.fieldId) {
      cardEl.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [scrollInto, moduleId])

  if (context === "report") return null

  return (
    <Card ref={cardEl} shadow="sm" withBorder>
      <Card.Section p="sm" withBorder>
        <Text>{moduleTitle}</Text>
        <ExternalLinks links={externalLinks} />
      </Card.Section>
      <Card.Section p="sm">{children}</Card.Section>
    </Card>
  )
}
