import { RootState } from "RootTypes"
import { TemplateNode } from "~/schemas/template"
import { AddableNode, createNodeId, findNode, isContainerNode } from "~/utils/editorUtils"
import { createHistorySlice, withHistory } from "./historySlice"

type TemplateState = TemplateNode

const initialState: TemplateState = {
  type: "Template",
  nodeId: createNodeId("template"),
  timestamp: Date.now(),
  title: "",
  info: "",
  structure: {
    type: "Structure",
    nodeId: createNodeId("structure"),
    timestamp: Date.now(),
    children: [
      {
        type: "Section",
        nodeId: createNodeId("section"),
        timestamp: Date.now(),
        label: "default",
        children: [],
      },
    ],
  },
  report: {
    type: "Report",
    nodeId: createNodeId("report"),
    timestamp: Date.now(),
    children: [],
  },
}

const templateSlice = createHistorySlice({
  name: "template",
  initialState,
  reducers: {
    setTemplate: withHistory<TemplateState, TemplateNode>((state, action) => action.payload),
    addNewNodeToContainer: withHistory<
      TemplateState,
      { node: AddableNode; containerId: string; index: number }
    >((state, action) => {
      const { node, containerId, index } = action.payload

      const containerNode = findNode(state, containerId)
      if (!containerNode || !isContainerNode(containerNode))
        throw new Error(`Invalid container with ID: ${containerId}`)

      containerNode.children.splice(index, 0, node as any)
    }),
    moveNodeBetweenContainers: withHistory<
      TemplateState,
      { sourceContainerId: string; oldIndex: number; targetContainerId: string; newIndex: number }
    >((state, action) => {
      const { sourceContainerId, oldIndex, targetContainerId, newIndex } = action.payload

      const sourceContainerNode = findNode(state, sourceContainerId)
      if (!sourceContainerNode || !isContainerNode(sourceContainerNode))
        throw new Error(`Invalid container with ID: ${sourceContainerId}`)

      const nodeToMove = sourceContainerNode.children.splice(oldIndex, 1)[0]

      const targetContainerNode = findNode(state, targetContainerId)
      if (!targetContainerNode || !isContainerNode(targetContainerNode))
        throw new Error(`Invalid container with ID: ${targetContainerId}`)

      console.log("redux", nodeToMove, sourceContainerNode, targetContainerNode, newIndex)

      targetContainerNode.children.splice(newIndex, 0, nodeToMove as any)
    }),
    moveNodeInsideContainer: withHistory<
      TemplateState,
      { containerId: string; oldIndex: number; newIndex: number }
    >((state, action) => {
      const { containerId, oldIndex, newIndex } = action.payload

      const containerNode = findNode(state, containerId)
      if (!containerNode || !isContainerNode(containerNode))
        throw new Error(`Invalid container with ID: ${containerId}`)

      const nodeToMove = containerNode.children.splice(oldIndex, 1)[0]
      containerNode.children.splice(newIndex, 0, nodeToMove as any)
    }),
  },
})

export const {
  setTemplate,
  addNewNodeToContainer,
  moveNodeBetweenContainers,
  moveNodeInsideContainer,
} = templateSlice.actions

export default templateSlice.reducer

export const selectTemplate = (state: RootState) => state.template.present
