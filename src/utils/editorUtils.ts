import { StatementEl, ParagraphEl, MeasurementsOutputEl, ReportEl } from "~/schemas/report"
import {
  DiscreteFieldEl,
  FindingFieldEl,
  GroupEl,
  HintEl,
  LayoutEl,
  SectionEl,
  StructureEl,
} from "~/schemas/structure"
import { TemplateEl } from "~/schemas/template"
import { createGid } from "./identifiers"

export type Element =
  | HintEl
  | DiscreteFieldEl
  | LayoutEl
  | FindingFieldEl
  | GroupEl
  | SectionEl
  | StructureEl
  | StatementEl
  | ParagraphEl
  | MeasurementsOutputEl
  | ReportEl
  | TemplateEl

export type ContainerElement =
  | LayoutEl
  | FindingFieldEl
  | GroupEl
  | SectionEl
  | ParagraphEl
  | ReportEl

export function createElement(id: string): Element {
  switch (id) {
    case "menu-Boolean": {
      return {
        type: "BooleanField",
        gid: createGid(),
        id: "boolean_field",
        label: "Boolean",
      }
    }
    default: {
      throw new Error(`Invalid element to create: ${id}`)
    }
  }
}

function isContainerElement(element: Element): element is ContainerElement {
  if (element.type === "Layout") return true
  if (element.type === "FindingField") return true
  if (element.type === "Group") return true
  if (element.type === "Section") return true
  if (element.type === "Paragraph") return true
  if (element.type === "Report") return true
  return false
}

export function findElementByGidWithContainer(
  templateEl: TemplateEl,
  gid: string
): [Element | null, ContainerElement | null] {
  let foundElement: Element | null = null
  let containerElement: ContainerElement | null = null

  const visit = (node: Element, parent: Element | null): boolean => {
    if (node.gid === gid) {
      foundElement = node
      if (isContainerElement(node)) {
        containerElement = node
      } else if (parent && isContainerElement(parent)) {
        containerElement = parent
      }
      return true
    }

    let finished = false
    if (node.type === "Template") {
      for (const child of node.structure.children) {
        if (finished) break
        finished = visit(child, node)
      }
      for (const child of node.report.children) {
        if (finished) break
        finished = visit(child, node)
      }
    } else if ("children" in node) {
      for (const child of node.children) {
        if (finished) break
        finished = visit(child, node)
      }
    }

    return finished
  }

  visit(templateEl, null)

  return [foundElement, containerElement]
}
