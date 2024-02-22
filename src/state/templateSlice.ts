import { createSlice } from "@reduxjs/toolkit"
import copy from "fast-copy"
import invariant from "tiny-invariant"
import { TemplateNode } from "~/schemas/template"
import {
  AddableNode,
  createNodeId,
  findContainer,
  findNode,
  isContainerNode,
} from "~/utils/designerUtils"
import { createHistoryAdapter } from "./historyAdapter"
import type { RootState } from "./store"

type TemplateState = TemplateNode

const templateHistoryAdapter = createHistoryAdapter<TemplateState>()

const initialState = templateHistoryAdapter.getInitialState({
  type: "Template",
  nodeId: createNodeId("template"),
  name: "",
  title: "",
  language: "",
  description: "",
  categories: [],
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
})

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    undo: templateHistoryAdapter.undo,
    redo: templateHistoryAdapter.redo,
    resetTemplate: templateHistoryAdapter.undoable<{}>((state) => {
      const resetState = copy(initialState.present)
      return Object.assign(resetState, {
        name: state.name,
        title: state.title,
        language: state.language,
        description: state.description,
        categories: state.categories,
        info: state.info,
      })
    }),
    setTemplate: templateHistoryAdapter.undoable<TemplateNode>((state, action) => action.payload),
    addNode: templateHistoryAdapter.undoable<{
      node: AddableNode
      containerId: string
      index: number
    }>((state, action) => {
      const { node, containerId, index } = action.payload

      const containerNode = findNode(state, containerId)
      invariant(
        containerNode && isContainerNode(containerNode),
        `Invalid container with ID: ${containerId}`
      )

      containerNode.children.splice(index, 0, node as any)
    }),
    moveNode: templateHistoryAdapter.undoable<{
      sourceContainerId: string
      sourceIndex: number
      targetContainerId: string
      targetIndex: number
    }>((state, action) => {
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
    deleteNode: templateHistoryAdapter.undoable<{ nodeId: string }>((state, action) => {
      const { nodeId } = action.payload
      const node = findNode(state, nodeId)
      invariant(node, `No node with ID: ${nodeId}`)

      const container = findContainer(state, nodeId)
      invariant(container, `No container for node with ID: ${action.payload.nodeId}`)

      const index = container.children.findIndex((child) => child.nodeId === nodeId)
      container.children.splice(index, 1)
    }),
    updateNode: templateHistoryAdapter.undoable<{ nodeId: string; data: Partial<AddableNode> }>(
      (state, action) => {
        const { nodeId, data } = action.payload
        const node = findNode(state, nodeId)
        invariant(node, `No node with ID: ${nodeId}`)
        Object.assign(node, data)
      }
    ),
  },
})

export const { undo, redo, resetTemplate, setTemplate, addNode, deleteNode, moveNode, updateNode } =
  templateSlice.actions

export default templateSlice.reducer

export const selectTemplate = (state: RootState) => state.template.present
export const selectCanUndo = (state: RootState) => state.template.past.length > 0
export const selectCanRedo = (state: RootState) => state.template.future.length > 0
