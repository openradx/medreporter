import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { Grid } from "@mantine/core"
import { useMounted } from "~/hooks/useMounted"
import { refreshMenu } from "~/state/editorSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import {
  addNewNodeToContainer,
  moveNodeBetweenContainers,
  moveNodeInsideContainer,
  selectTemplate,
} from "~/state/templateSlice"
import {
  AddableNode,
  ContainerNode,
  DragData,
  findContainer,
  isContainerNode,
} from "~/utils/editorUtils"
import { DesignerMenu } from "./DesignerMenu"
import { DesignerPanel } from "./DesignerPanel"
import { DragOverlayWrapper } from "./DragOverlayWrapper"
import { PropertiesPanel } from "./PropertiesPanel"

export const TemplateDesigner = () => {
  const mounted = useMounted()
  const dispatch = useAppDispatch()
  const template = useAppSelector(selectTemplate)

  const handleDragOver = (event: DragOverEvent) => {
    console.log("over")
    if (event.over === null) return

    const { origin, node: activeNode } = event.active.data.current as DragData
    const { node: overNode } = event.over.data.current as DragData

    if (activeNode === overNode) return

    if (origin === "menu") {
      let overContainer: ContainerNode
      if (isContainerNode(overNode)) {
        overContainer = overNode
      } else {
        const container = findContainer(template, overNode.nodeId)
        if (!container) throw new Error(`Invalid container ID: ${overNode.nodeId}`)
        overContainer = container
      }

      let overIndex: number
      if (isContainerNode(overNode)) {
        overIndex = overNode.children.length
      } else {
        overIndex = overContainer.children.findIndex((child) => child.nodeId === overNode.nodeId)
      }

      const isBelowOverItem =
        event.active.rect.current.translated &&
        event.active.rect.current.translated.top > event.over.rect.top + event.over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      const newIndex = overIndex >= 0 ? overIndex + modifier : overContainer.children.length + 1

      dispatch(
        addNewNodeToContainer({
          node: activeNode as AddableNode,
          containerId: overContainer.nodeId,
          index: newIndex,
        })
      )
    } else {
      const activeContainer = findContainer(template, activeNode.nodeId)
      if (!activeContainer) throw new Error(`Invalid container ID: ${activeNode.nodeId}`)

      let overContainer: ContainerNode
      if (isContainerNode(overNode)) {
        overContainer = overNode
      } else {
        const container = findContainer(template, overNode.nodeId)
        if (!container) throw new Error(`Invalid container ID: ${overNode.nodeId}`)
        overContainer = container
      }

      if (activeContainer !== overContainer) {
        console.log("active container ", activeContainer.nodeId)
        console.log("over container ", overContainer.nodeId)
        dispatch(
          moveNodeBetweenContainers({
            sourceContainerId: activeContainer.nodeId,
            targetContainerId: overContainer.nodeId,
            oldIndex: activeContainer.children.findIndex(
              (child) => child.nodeId === activeNode.nodeId
            ),
            newIndex: overContainer.children.length,
          })
        )
      }
    }

    // const activeId = String(event.active.id)
    // const overId = String(event.over.id)

    // const overNode = findNode(templateEl, overId)
    // if (!overNode) throw new Error(`Invalid over node with ID: ${overId}`)

    // let overContainer: ContainerNode
    // if (isContainerNode(overNode)) {
    //   overContainer = overNode
    // } else {
    //   const container = findContainer(templateEl, overId)
    //   if (!container) throw new Error(`Found no container for ID: ${overId}`)
    //   overContainer = container
    // }

    // const activeData = event.active.data.current as DragData

    // if (activeData.origin === "menu") {
    //   if (!overContainer) return
    //   dispatch(
    //     addNode({
    //       node: activeData.node as AddableNode,
    //       containerId: overContainer.nodeId,
    //       index: 0,
    //     })
    //   )
    //   return
    // }

    // const activeNode = findNode(templateEl, activeId)
    // if (!activeNode) throw new Error(`Invalid active node with ID: ${activeData.node.nodeId}`)

    // const activeContainer = findContainer(templateEl, activeId)
    // if (!activeContainer) throw new Error(`Found no container for ID: ${activeId}`)

    // if (activeContainer !== overContainer) {
    //   const overItems = overContainer.children
    //   const activeIndex = activeContainer.children.indexOf(activeNode as any)
    //   const overIndex = overContainer.children.indexOf(overNode as any)

    //   const isBelowOverItem =
    //     event.active.rect.current.translated &&
    //     event.active.rect.current.translated.top > event.over.rect.top + event.over.rect.height

    //   const modifier = isBelowOverItem ? 1 : 0

    //   const newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
    // }

    // if (overId === null) return
    // const activeElement = findElement(templateEl, String(event.active.id))
    // const activeContainer = findContainer(templateEl, String(event.active.id))
    // const overContainer = findContainer(templateEl, overId)
    // if (!activeElement || !activeContainer || !overContainer) return
    // // activeContainer.children.push(activeElement)
    // // dispatch(moveElement(activeId, overContainer, index))
    // console.log("drag over: ", activeId, overId)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) return

    const { node: activeNode } = event.active.data.current as DragData
    const { node: overNode } = event.over.data.current as DragData

    const activeContainer = findContainer(template, activeNode.nodeId)
    if (!activeContainer) throw new Error(`Found no container for ID: ${activeNode.nodeId}`)

    const overContainer = findContainer(template, overNode.nodeId)
    if (!overContainer) throw new Error(`Found no container for ID: ${overNode.nodeId}`)

    if (activeContainer === overContainer) {
      const oldIndex = activeContainer.children.findIndex(
        (child) => child.nodeId === activeNode.nodeId
      )

      let newIndex: number
      if (overNode === overContainer) {
        newIndex = overNode.children.length + 1
      } else {
        newIndex = overContainer.children.findIndex((child) => child.nodeId === overNode.nodeId)
      }

      dispatch(
        moveNodeInsideContainer({
          containerId: activeContainer.nodeId,
          oldIndex,
          newIndex,
        })
      )
    }

    // if (activeContainer !== overContainer) {
    //   throw new Error("Active container does not match over container.")
    // }

    dispatch(refreshMenu())
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    mounted && (
      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Grid sx={{ height: "100%" }}>
          <Grid.Col span="content">
            <DesignerMenu />
          </Grid.Col>
          <Grid.Col span="auto">
            <DesignerPanel templateEl={template} />
          </Grid.Col>
          <Grid.Col span="content">
            <PropertiesPanel />
          </Grid.Col>
        </Grid>
        <DragOverlayWrapper />
      </DndContext>
    )
  )
}
