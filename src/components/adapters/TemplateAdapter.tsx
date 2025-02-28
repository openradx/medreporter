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
import { useRouter } from "next/router"
import invariant from "tiny-invariant"
import { useGrabbingCursor } from "~/hooks/useGrabbingCursor"
import { useIsDesigning } from "~/hooks/useIsDesigning"
import { useMounted } from "~/hooks/useMounted"
import { useUser } from "~/hooks/useUser"
import { TemplateNode } from "~/schemas/template"
import { refreshMenu, setSelectedItem } from "~/state/designerSlice"
import { useAppDispatch } from "~/state/store"
import { addNode, deleteNode, moveNode } from "~/state/templateSlice"
import {
  AddableNode,
  ContainerNode,
  DraggableData,
  DroppableData,
  findContainer,
  isContainerNode,
  isFittingContainer,
} from "~/utils/designerUtils"
import { DesignerNavbarCenter } from "../designer/DesignerNavbarCenter"
import { DesignerSidebar } from "../designer/DesignerSidebar"
import { DragOverlayWrapper } from "../designer/DragOverlayWrapper"
import { Template } from "../template/Template"
import { TemplateNavbarCenter } from "../template/TemplateNavbarCenter"
import { InterpreterProvider } from "./InterpreterProvider"
import { ReportAdapter } from "./ReportAdapter"
import { StructureAdapter } from "./StructureAdapter"

interface TemplateAdapterProps {
  node: TemplateNode
}

export const TemplateAdapter = ({ node }: TemplateAdapterProps) => {
  const mounted = useMounted()
  const dispatch = useAppDispatch()
  const [grabbingCursorOn, grabbingCursorOff] = useGrabbingCursor()
  const isDesigning = useIsDesigning()
  const router = useRouter()
  const user = useUser()
  const author = router.query.username as string
  const isOwnTemplate = user?.username === author

  const handleDragStart = () => {
    grabbingCursorOn()
    dispatch(setSelectedItem(null))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    grabbingCursorOff()

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
      const container = findContainer(node, overNode.nodeId)
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
    const sourceContainer = findContainer(node, activeNode.nodeId)
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
    <InterpreterProvider>
      {isDesigning ? (
        <DesignerNavbarCenter title={node.title} />
      ) : (
        <TemplateNavbarCenter title={node.title} isOwnTemplate={isOwnTemplate} />
      )}

      {mounted && (
        <DndContext
          sensors={sensors}
          modifiers={[snapCenterToCursor]}
          collisionDetection={customCollisionDetection}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Template
            slug={node.slug}
            title={node.title}
            description={node.description}
            categories={node.categories}
            language={node.language}
          >
            <Flex h="100%" align="stretch" gap="xs">
              <Transition mounted={isDesigning} transition={collapse} duration={400}>
                {(styles) => (
                  <div style={{ ...styles, overflowX: "hidden" }}>
                    <DesignerSidebar />
                  </div>
                )}
              </Transition>
            </Flex>
            <StructureAdapter node={node.structure} />
            <ReportAdapter node={node.report} />
          </Template>
          <DragOverlayWrapper />
        </DndContext>
      )}
    </InterpreterProvider>
  )
}
