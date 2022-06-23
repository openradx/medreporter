import { Card } from "@mantine/core"
import { ReactNode, useEffect, useRef } from "react"
import { useModule } from "../../contexts/ModuleContext"
import { useStructuredReport } from "../../contexts/StructuredReportContext"
import { selectScrollInto } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"
import { ExternalLink } from "../fields/fieldTypes"
import { ModuleHeader } from "./ModuleHeader"

const DEFAULT_EXTERNAL_LINKS: ExternalLink[] = []

interface StructureProps {
  title: string
  externalLinks?: ExternalLink[]
  children?: ReactNode
}

export const Structure = ({
  title,
  externalLinks = DEFAULT_EXTERNAL_LINKS,
  children,
}: StructureProps) => {
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

  return (
    <Card ref={cardEl} shadow="sm" withBorder>
      <Card.Section withBorder>
        <ModuleHeader title={title} />
      </Card.Section>
      <Card.Section p="sm">{children}</Card.Section>
    </Card>
  )
}
