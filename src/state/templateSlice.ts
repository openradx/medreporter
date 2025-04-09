import { ReleaseStatus, Visibility } from "@prisma/client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import copy from "fast-copy"
import { createPatchHistoryAdapter } from "history-adapter/redux"
import invariant from "tiny-invariant"
import { TemplateNode } from "~/schemas/template"
import {
  AddableNode,
  createNodeId,
  findContainer,
  findNode,
  isContainerNode,
} from "~/utils/designerUtils"

type TemplateState = TemplateNode

const templateHistoryAdapter = createPatchHistoryAdapter<TemplateState>()

const initialState = templateHistoryAdapter.getInitialState({
  type: "Template",
  nodeId: createNodeId("template"),
  id: "",
  slug: "",
  title: "",
  language: "",
  description: "",
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
  visibility: Visibility.PRIVATE,
  releaseStatus: ReleaseStatus.DRAFT,
  categories: [],
})

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    undo: templateHistoryAdapter.undo,
    redo: templateHistoryAdapter.redo,
    resetTemplate: templateHistoryAdapter.undoableReducer((state) => {
      const resetState = copy(initialState.present)
      return Object.assign(resetState, {
        id: state.id,
        slug: state.slug,
        title: state.title,
        language: state.language,
        description: state.description,
        categories: state.categories,
      })
    }),
    setId(state, action: PayloadAction<string>) {
      state.present.id = action.payload
    },
    addNode: templateHistoryAdapter.undoableReducer(
      (state, action: PayloadAction<{ node: AddableNode; containerId: string; index: number }>) => {
        const { node, containerId, index } = action.payload

        const containerNode = findNode(state, containerId)
        invariant(
          containerNode && isContainerNode(containerNode),
          `Invalid container with ID: ${containerId}`
        )

        containerNode.children.splice(index, 0, node as any)
      }
    ),
    moveNode: templateHistoryAdapter.undoableReducer(
      (
        state,
        action: PayloadAction<{
          sourceContainerId: string
          sourceIndex: number
          targetContainerId: string
          targetIndex: number
        }>
      ) => {
        const { sourceContainerId, sourceIndex, targetContainerId, targetIndex } = action.payload

        const sourceContainerNode = findNode(state, sourceContainerId)
        invariant(
          sourceContainerNode && isContainerNode(sourceContainerNode),
          `Invalid container with ID: ${sourceContainerId}`
        )

        let targetContainerNode = sourceContainerNode
        if (targetContainerId !== targetContainerNode.nodeId) {
          const node = findNode(state, targetContainerId)
          invariant(
            node && isContainerNode(node),
            `Invalid container with ID: ${targetContainerId}`
          )
          targetContainerNode = node
        }

        const nodeToMove = sourceContainerNode.children.splice(sourceIndex, 1)[0]
        invariant(
          nodeToMove,
          `Invalid node to move with index ${sourceIndex} in container ${sourceContainerId}`
        )
        targetContainerNode.children.splice(targetIndex, 0, nodeToMove as any)
      }
    ),
    deleteNode: templateHistoryAdapter.undoableReducer(
      (state, action: PayloadAction<{ nodeId: string }>) => {
        const { nodeId } = action.payload
        const node = findNode(state, nodeId)
        invariant(node, `No node with ID: ${nodeId}`)

        const container = findContainer(state, nodeId)
        invariant(container, `No container for node with ID: ${action.payload.nodeId}`)

        const index = container.children.findIndex((child) => child.nodeId === nodeId)
        container.children.splice(index, 1)
      }
    ),
    updateNode: {
      prepare: templateHistoryAdapter.withPayload<{ nodeId: string; data: Partial<AddableNode> }>(),
      reducer: templateHistoryAdapter.undoableReducer(
        (state, action: PayloadAction<{ nodeId: string; data: Partial<AddableNode> }>) => {
          const { nodeId, data } = action.payload
          const node = findNode(state, nodeId)
          invariant(node, `No node with ID: ${nodeId}`)
          Object.assign(node, data)
        }
      ),
    },
  },
  selectors: {
    ...templateHistoryAdapter.getSelectors(),
  },
})

export const { undo, redo, resetTemplate, setId, addNode, deleteNode, moveNode, updateNode } =
  templateSlice.actions

export default templateSlice.reducer

export const {
  selectCanUndo,
  selectCanRedo,
  selectPresent: selectTemplate,
} = templateSlice.selectors
