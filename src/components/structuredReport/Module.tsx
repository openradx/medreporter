import { Card, Text } from "@mantine/core"
import { ReactNode, useEffect, useRef } from "react"
import { ModuleContextProvider } from "../../contexts/ModuleContext"
import { useAppSelector } from "../../state/store"
import { selectScrollInto } from "../../state/structureSlice"
import { ExternalLink } from "../fields/fieldTypes"
import { ExternalLinks } from "./ExternalLinks"

const DEFAULT_EXTERNAL_LINKS: ExternalLink[] = []

interface ModuleProps {
  name: string
  id: string
  title: string
  externalLinks?: ExternalLink[]
  children?: ReactNode
}

export const Module = ({
  name,
  id,
  title,
  externalLinks = DEFAULT_EXTERNAL_LINKS,
  children,
}: ModuleProps) => {
  const scrollInto = useAppSelector(selectScrollInto)
  const cardEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollInto && scrollInto.moduleId === id && !scrollInto.fieldId) {
      cardEl.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [scrollInto, id])

  return (
    <Card shadow="sm" withBorder>
      <Card.Section p="sm" withBorder>
        <Text>{title}</Text>
        <ExternalLinks links={externalLinks} />
      </Card.Section>
      <Card.Section p="sm">
        <ModuleContextProvider value={{ context: "structure", moduleName: name, moduleId: id }}>
          {children}
        </ModuleContextProvider>
      </Card.Section>
    </Card>
  )
}
