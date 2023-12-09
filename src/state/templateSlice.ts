import { RootState } from "RootTypes"
import invariant from "tiny-invariant"
import { TemplateNode } from "~/schemas/template"
import {
  AddableNode,
  createNodeId,
  findContainer,
  findNode,
  isContainerNode,
} from "~/utils/designerUtils"
import { createHistorySlice, withHistory } from "./historySlice"

type TemplateState = TemplateNode

const initialState: TemplateState = {
  type: "Template",
  nodeId: createNodeId("template"),
  title: "",
  info: "",
  structure: {
    type: "Structure",
    nodeId: createNodeId("structure"),
    children: [
      {
        type: "Section",
        nodeId: createNodeId("section"),
        label: "default",
        children: [],
      },
    ],
  },
  report: {
    type: "Report",
    nodeId: createNodeId("report"),
    children: [],
  },
}

const templateSlice = createHistorySlice({
  name: "template",
  initialState,
  reducers: {
    setTemplate: withHistory<TemplateState, TemplateNode>((state, action) => action.payload),
    addNode: withHistory<TemplateState, { node: AddableNode; containerId: string; index: number }>(
      (state, action) => {
        const { node, containerId, index } = action.payload

        const containerNode = findNode(state, containerId)
        invariant(
          containerNode && isContainerNode(containerNode),
          `Invalid container with ID: ${containerId}`
        )

        containerNode.children.splice(index, 0, node as any)
      }
    ),
    moveNode: withHistory<
      TemplateState,
      {
        sourceContainerId: string
        sourceIndex: number
        targetContainerId: string
        targetIndex: number
      }
    >((state, action) => {
      const { sourceContainerId, sourceIndex, targetContainerId, targetIndex } = action.payload

      const sourceContainerNode = findNode(state, sourceContainerId)
      invariant(
        sourceContainerNode && isContainerNode(sourceContainerNode),
        `Invalid container with ID: ${sourceContainerId}`
      )

      let targetContainerNode = sourceContainerNode
      if (targetContainerId !== targetContainerNode.nodeId) {
        const node = findNode(state, targetContainerId)
        invariant(node && isContainerNode(node), `Invalid container with ID: ${targetContainerId}`)
        targetContainerNode = node
      }

      const nodeToMove = sourceContainerNode.children.splice(sourceIndex, 1)[0]
      invariant(
        nodeToMove,
        `Invalid node to move with index ${sourceIndex} in container ${sourceContainerId}`
      )
      targetContainerNode.children.splice(targetIndex, 0, nodeToMove as any)
    }),
    deleteNode: withHistory<TemplateState, { nodeId: string }>((state, action) => {
      const { nodeId } = action.payload
      const node = findNode(state, nodeId)
      invariant(node, `No node with ID: ${nodeId}`)

      const container = findContainer(state, nodeId)
      invariant(container, `No container for node with ID: ${action.payload.nodeId}`)

      const index = container.children.findIndex((child) => child.nodeId === nodeId)
      container.children.splice(index, 1)
    }),
    updateNode: withHistory<TemplateState, { nodeId: string; data: Partial<AddableNode> }>(
      (state, action) => {
        const { nodeId, data } = action.payload
        const node = findNode(state, nodeId)
        invariant(node, `No node with ID: ${nodeId}`)
        Object.assign(node, data)
      }
    ),
  },
})

export const { setTemplate, addNode, deleteNode, moveNode, updateNode } = templateSlice.actions

export default templateSlice.reducer

export const selectTemplate = (state: RootState) => state.template.present
