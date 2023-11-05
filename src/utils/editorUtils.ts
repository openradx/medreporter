import { customAlphabet } from "nanoid"
import { alphanumeric } from "nanoid-dictionary"
import {
  MeasurementsOutputNode,
  ParagraphNode,
  ReportNode,
  StatementNode,
  paragraphChildrenTypes,
  reportChildrenTypes,
} from "~/schemas/report"
import {
  DiscreteFieldNode,
  FindingFieldNode,
  GroupNode,
  HintNode,
  LayoutNode,
  SectionNode,
  StructureNode,
  findingFieldChildrenTypes,
  groupChildrenTypes,
  layoutChildrenTypes,
  sectionChildrenTypes,
  structureChildrenTypes,
} from "~/schemas/structure"
import { TemplateNode } from "~/schemas/template"

export type AddableNode =
  | HintNode
  | DiscreteFieldNode
  | LayoutNode
  | FindingFieldNode
  | GroupNode
  | StatementNode
  | ParagraphNode
  | MeasurementsOutputNode

export type StructuredReportNode =
  | AddableNode
  | SectionNode
  | StructureNode
  | ReportNode
  | TemplateNode

export type ContainerNode =
  | StructureNode
  | SectionNode
  | FindingFieldNode
  | GroupNode
  | LayoutNode
  | ReportNode
  | ParagraphNode

export type DragData = {
  origin: "menu" | "template"
  node: StructuredReportNode
}

const createNodeHash = customAlphabet(alphanumeric, 21)
export function createNodeId(prefix: string) {
  return `${prefix}_${createNodeHash()}`
}

const createFieldHash = customAlphabet(alphanumeric, 8)
export function createFieldId(prefix: string) {
  return `${prefix}_${createFieldHash()}`
}

const addableNodes: Set<AddableNode["type"]> = new Set([
  "BooleanField",
  "DateField",
  "FreeTextField",
  "NumberField",
  "SingleChoiceField",
  "MultipleChoiceField",
  "TimeField",
])

export function isAddableNode(node: StructuredReportNode): node is AddableNode {
  const addableNodesAsStrings: Set<string> = addableNodes
  return addableNodesAsStrings.has(node.type)
}

export function isFittingStructure(
  node: StructuredReportNode
): node is StructureNode["children"][0] {
  const structureChildrenTypesAsStrings: Set<string> = structureChildrenTypes
  return structureChildrenTypesAsStrings.has(node.type)
}

export function isFittingSection(node: StructuredReportNode): node is SectionNode["children"][0] {
  const sectionChildrenTypesAsStrings: Set<string> = sectionChildrenTypes
  return sectionChildrenTypesAsStrings.has(node.type)
}

export function isFittingFindingField(
  node: StructuredReportNode
): node is FindingFieldNode["children"][0] {
  const findingFieldChildrenTypesAsStrings: Set<string> = findingFieldChildrenTypes
  return findingFieldChildrenTypesAsStrings.has(node.type)
}

export function isFittingGroup(node: StructuredReportNode): node is GroupNode["children"][0] {
  const groupChildrenTypesAsStrings: Set<string> = groupChildrenTypes
  return groupChildrenTypesAsStrings.has(node.type)
}

export function isFittingLayout(node: StructuredReportNode): node is LayoutNode["children"][0] {
  const layoutChildrenTypesAsStrings: Set<string> = layoutChildrenTypes
  return layoutChildrenTypesAsStrings.has(node.type)
}

export function isFittingReport(node: StructuredReportNode): node is ReportNode["children"][0] {
  const reportChildrenTypesAsStrings: Set<string> = reportChildrenTypes
  return reportChildrenTypesAsStrings.has(node.type)
}

export function isFittingParagraph(
  node: StructuredReportNode
): node is ParagraphNode["children"][0] {
  const paragraphChildrenTypesAsStrings: Set<string> = paragraphChildrenTypes
  return paragraphChildrenTypesAsStrings.has(node.type)
}

export function isFittingContainer(node: StructuredReportNode, container: ContainerNode): boolean {
  return (
    (container.type === "Structure" && isFittingStructure(node)) ||
    (container.type === "Section" && isFittingSection(node)) ||
    (container.type === "FindingField" && isFittingFindingField(node)) ||
    (container.type === "Group" && isFittingGroup(node)) ||
    (container.type === "Layout" && isFittingLayout(node)) ||
    (container.type === "Report" && isFittingReport(node)) ||
    (container.type === "Paragraph" && isFittingParagraph(node))
  )
}

const containerNodes: Set<ContainerNode["type"]> = new Set([
  "Structure",
  "Section",
  "FindingField",
  "Group",
  "Layout",
  "Report",
  "Paragraph",
])

/**
 * Check if the given node is a container node.
 *
 * @param {StructuredReportNode} node - The node to check.
 * @return {boolean} Returns true if the node is a container node, false otherwise.
 */
export function isContainerNode(node: StructuredReportNode): node is ContainerNode {
  const containerNodesAsStrings: Set<string> = containerNodes
  return containerNodesAsStrings.has(node.type)
}

function visitTemplate(
  templateNode: TemplateNode,
  callback: (node: StructuredReportNode) => boolean | void
): StructuredReportNode[] | undefined {
  const visit = (
    node: StructuredReportNode,
    currentPath: StructuredReportNode[]
  ): StructuredReportNode[] | undefined => {
    if (callback(node)) {
      return [...currentPath, node]
    }

    let path: StructuredReportNode[] | undefined
    if (node.type === "Template") {
      path = visit(node.structure, [...currentPath, node])
      if (path) return path
      path = visit(node.report, [...currentPath, node])
      if (path) return path
    } else if ("children" in node) {
      for (const child of node.children) {
        path = visit(child, [...currentPath, node])
        if (path) return path
      }
    }

    return undefined
  }

  return visit(templateNode, [])
}

/**
 * Retrieves the node path for a given node ID in the template.
 *
 * @param {TemplateNode} templateNode - The root template node.
 * @param {string} nodeId - The ID of the node to find the path for.
 * @returns {StructuredReportNode[] | undefined} - The node path as an array of structured report nodes, or undefined if the node ID was not found.
 */
export function getNodePath(
  templateNode: TemplateNode,
  nodeId: string
): StructuredReportNode[] | undefined {
  return visitTemplate(templateNode, (node) => node.nodeId === nodeId)
}

export function getAllNodeIds(templateEl: TemplateNode): string[] {
  const nodeIds = new Set<string>()
  visitTemplate(templateEl, (node) => {
    nodeIds.add(node.nodeId)
  })
  return Array.from(nodeIds)
}

export function getAllFieldIds(templateEl: TemplateNode): string[] {
  const fieldIds = new Set<string>()
  visitTemplate(templateEl, (node) => {
    if ("fieldId" in node && node.fieldId) {
      fieldIds.add(node.fieldId)
    }
  })
  return Array.from(fieldIds)
}

// function getElementPath(templateEl: TemplateEl, elementId: string): NodeElement[] | undefined {
//   const visit = (element: NodeElement, currentPath: NodeElement[]): NodeElement[] | undefined => {
//     if (element.elementId === elementId) {
//       return [...currentPath, element]
//     }

//     let path: NodeElement[] | undefined
//     if (element.type === "Template") {
//       path = visit(element.structure, [...currentPath, element])
//       if (path) return path
//       path = visit(element.report, [...currentPath, element])
//       if (path) return path
//     } else if ("children" in element) {
//       for (const child of element.children) {
//         path = visit(child, [...currentPath, element])
//         if (path) return path
//       }
//     }

//     return undefined
//   }

//   return visit(templateEl, [])
// }

/**
 * Finds a node in a template node using the node ID.
 *
 * @param {TemplateNode} templateNode - The template node to search in.
 * @param {string} nodeId - The ID of the node to find.
 * @return {StructuredReportNode | null} The found node or null if not found.
 */
export function findNode(templateNode: TemplateNode, nodeId: string): StructuredReportNode | null {
  const path = getNodePath(templateNode, nodeId)
  if (path && path.length > 0) return path[path.length - 1]
  return null
}

/**
 * Get the container node of a node in a template based on the given node ID. When the node with
 * the provided ID itself is a container, then also its surrounding container will be returned.
 *
 * @param {TemplateNode} templateNode - The template node to search in.
 * @param {string} nodeId - The ID of the node for which to find its container.
 * @return {ContainerNode | null} Returns the container node if found, otherwise null.
 */
export function findContainer(templateNode: TemplateNode, nodeId: string): ContainerNode | null {
  const path = getNodePath(templateNode, nodeId)
  if (path && path.length > 1) {
    const containerNode = path[path.length - 2]
    if (isContainerNode(containerNode)) return containerNode
  }
  return null
}
