import {
  CollisionDetection,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { snapCenterToCursor } from "@dnd-kit/modifiers"
import { Flex, Transition } from "@mantine/core"
import invariant from "tiny-invariant"
import { DesignerContextProvider } from "~/contexts/DesignerContext"
import { useMounted } from "~/hooks/useMounted"
import { refreshMenu, selectPreview, setSelectedItem } from "~/state/designerSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { addNode, deleteNode, moveNode, selectTemplate } from "~/state/templateSlice"
import {
  AddableNode,
  ContainerNode,
  DraggableData,
  DroppableData,
  findContainer,
  isContainerNode,
  isFittingContainer,
} from "~/utils/designerUtils"
import { DesignerCanvas } from "./DesignerCanvas"
import { DesignerSidebar } from "./DesignerSidebar"
import { DragOverlayWrapper } from "./DragOverlayWrapper"

export const TemplateDesigner = () => {
  const mounted = useMounted()
  const dispatch = useAppDispatch()
  const template = useAppSelector(selectTemplate)
  const preview = useAppSelector(selectPreview)

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) return

    const { node: activeNode, origin } = event.active.data.current as DraggableData

    // Handle trash can to remove node
    if (event.over.id === "trash-can") {
      if (origin === "menu") {
        dispatch(refreshMenu())
      } else {
        dispatch(deleteNode({ nodeId: activeNode.nodeId }))
      }
      return
    }

    const { node: overNode, dropType } = event.over.data.current as DroppableData

    // Find final target container
    let targetContainer: ContainerNode
    let targetIndex: number = 0
    if (dropType === "container") {
      invariant(
        isContainerNode(overNode),
        `Node ${overNode.nodeId} is not a container but has dropType container.`
      )
      targetContainer = overNode
      targetIndex = targetContainer.children.length
    } else {
      const container = findContainer(template, overNode.nodeId)
      invariant(container, `No container for node ${overNode.nodeId}.`)
      targetContainer = container
      targetIndex = targetContainer.children.findIndex((child) => child.nodeId === overNode.nodeId)
      invariant(
        targetIndex !== -1,
        `Node ${overNode.nodeId} is not in container ${targetContainer.nodeId}`
      )
    }

    // Check if node fits into target container
    if (!isFittingContainer(activeNode, targetContainer)) {
      return
    }

    // Add node if it's from the menu
    if (origin === "menu") {
      if (dropType === "end") {
        targetIndex++
      }
      dispatch(
        addNode({
          node: activeNode as AddableNode,
          containerId: targetContainer.nodeId,
          index: targetIndex,
        })
      )
      dispatch(refreshMenu())
      return
    }

    // Move node if it's from the canvas
    const sourceContainer = findContainer(template, activeNode.nodeId)
    invariant(sourceContainer, `No container for node ${activeNode.nodeId}.`)
    const sourceIndex = sourceContainer.children.findIndex(
      (child) => child.nodeId === activeNode.nodeId
    )
    invariant(
      sourceIndex !== -1,
      `Node ${activeNode.nodeId} is not in container ${sourceContainer.nodeId}`
    )

    if (sourceContainer === targetContainer) {
      if (sourceIndex === targetIndex) {
        return
      }
      if (sourceIndex < targetIndex && dropType === "start") {
        targetIndex--
      } else if (sourceIndex > targetIndex && dropType === "end") {
        targetIndex++
      }
    } else if (dropType === "end") {
      targetIndex++
    }

    dispatch(
      moveNode({
        sourceContainerId: sourceContainer.nodeId,
        sourceIndex,
        targetContainerId: targetContainer.nodeId,
        targetIndex,
      })
    )
  }

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  const customCollisionDetection: CollisionDetection = (args) => {
    let collisions = pointerWithin(args)
    const collision = collisions[0]
    if (collision && collision.id === "trash-can") {
      return collisions
    }

    collisions = rectIntersection(args)
    return collisions.filter((col) => col.id !== "trash-can")
  }

  const collapse = {
    in: { opacity: 1, width: 300 },
    out: { opacity: 0, width: 0 },
    transitionProperty: "width, opacity",
  }

  return (
    <DesignerContextProvider value={{ isInsideDesigner: true }}>
      {mounted && (
        <DndContext
          sensors={sensors}
          modifiers={[snapCenterToCursor]}
          collisionDetection={customCollisionDetection}
          onDragStart={() => dispatch(setSelectedItem(null))}
          onDragEnd={handleDragEnd}
        >
          <Flex h="100%" align="stretch" gap="xs">
            <Transition mounted={!preview} transition={collapse} duration={400}>
              {(styles) => (
                <div style={{ ...styles, overflowX: "hidden" }}>
                  <DesignerSidebar />
                </div>
              )}
            </Transition>
            <DesignerCanvas templateEl={template} />
          </Flex>
          <DragOverlayWrapper />
        </DndContext>
      )}
    </DesignerContextProvider>
  )
}
