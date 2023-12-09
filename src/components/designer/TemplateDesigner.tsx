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
import { Grid } from "@mantine/core"
import invariant from "tiny-invariant"
import { useMounted } from "~/hooks/useMounted"
import { refreshMenu, setSelectedItem } from "~/state/designerSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { addNode, deleteNode, moveNode, selectTemplate } from "~/state/templateSlice"
import {
  AddableNode,
  ContainerNode,
  DraggableData,
  DroppableData,
  findContainer,
  isContainerNode,
} from "~/utils/designerUtils"
import { DesignerCanvas } from "./DesignerCanvas"
import { DesignerSidebar } from "./DesignerSidebar"
import { DragOverlayWrapper } from "./DragOverlayWrapper"
import classes from "./TemplateDesigner.module.css"

export const TemplateDesigner = () => {
  const mounted = useMounted()
  const dispatch = useAppDispatch()
  const template = useAppSelector(selectTemplate)

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) return

    const { node: activeNode, origin } = event.active.data.current as DraggableData

    if (event.over.id === "trash-can") {
      if (origin === "menu") {
        dispatch(refreshMenu())
      } else {
        dispatch(deleteNode({ nodeId: activeNode.nodeId }))
      }
      return
    }

    const { node: overNode, dropType } = event.over.data.current as DroppableData

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

    // collisions = closestCorners(args)
    // collisions = closestCenter(args)
    collisions = rectIntersection(args)
    return collisions.filter((col) => col.id !== "trash-can")
  }

  return (
    mounted && (
      <DndContext
        sensors={sensors}
        modifiers={[snapCenterToCursor]}
        collisionDetection={customCollisionDetection}
        onDragStart={() => dispatch(setSelectedItem(null))}
        onDragEnd={handleDragEnd}
      >
        <Grid classNames={{ inner: classes.inner }} h="100%">
          <Grid.Col span="content" miw={250} h="100%" pb={0}>
            <DesignerSidebar />
          </Grid.Col>
          <Grid.Col span="auto" h="100%" pb={0}>
            <DesignerCanvas templateEl={template} />
          </Grid.Col>
        </Grid>
        <DragOverlayWrapper />
      </DndContext>
    )
  )
}
