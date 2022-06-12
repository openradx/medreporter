import { Card, Text } from "@mantine/core"
import { ReactNode, useEffect, useRef } from "react"
import { ModuleContextProvider } from "../../contexts/ModuleContext"
import { useAppSelector } from "../../state/store"
import { selectScrollInto } from "../../state/structureSlice"
import { ExternalLink } from "../fields/fieldTypes"
import { ExternalLinks } from "./ExternalLinks"

const DEFAULT_EXTERNAL_LINKS: ExternalLink[] = []

interface ModuleProps {
  title: string
  moduleId: string
  instanceId: string
  externalLinks?: ExternalLink[]
  children?: ReactNode
}

export const Module = ({
  title,
  moduleId,
  instanceId,
  externalLinks = DEFAULT_EXTERNAL_LINKS,
  children,
}: ModuleProps) => {
  const scrollInto = useAppSelector(selectScrollInto)
  const cardEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollInto && scrollInto.instanceId === instanceId && !scrollInto.fieldId) {
      cardEl.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [scrollInto, instanceId])

  return (
    <Card shadow="sm" withBorder>
      <Card.Section p="sm" withBorder>
        <Text>{title}</Text>
        <ExternalLinks links={externalLinks} />
      </Card.Section>
      <Card.Section p="sm">
        <ModuleContextProvider value={{ context: "structure", moduleId, instanceId }}>
          {children}
        </ModuleContextProvider>
      </Card.Section>
    </Card>
  )
}
