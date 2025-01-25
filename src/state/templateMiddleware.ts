import { notifications } from "@mantine/notifications"
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { trpcVanilla } from "~/utils/trpc"
import { appendLog, setSyncingState } from "./displaySlice"
import { type AppDispatch, type RootState } from "./store"
import {
  undo,
  redo,
  resetTemplate,
  addNode,
  deleteNode,
  moveNode,
  updateNode,
  setId,
} from "./templateSlice"

export const templateMiddleware = createListenerMiddleware()
const startAppListening = templateMiddleware.startListening.withTypes<RootState, AppDispatch>()
startAppListening({
  matcher: isAnyOf(undo, redo, resetTemplate, addNode, deleteNode, moveNode, updateNode),
  effect: async (action, listenerApi) => {
    const currentState = listenerApi.getState()
    const { dispatch } = listenerApi

    let hasError = false
    try {
      dispatch(setSyncingState("syncing"))
      const { id } = await trpcVanilla.templates.createOrUpdateTemplate.mutate(
        currentState.template.present
      )
      dispatch(setId(id))
    } catch (error) {
      hasError = true
      notifications.show({
        title: "Error",
        message: "An error occurred while syncing your changes with the server",
        color: "red",
      })
      dispatch(setSyncingState("error"))
      dispatch(
        appendLog({
          message: `Error: ${(error as Error).message}`,
          level: "error",
        })
      )
    } finally {
      if (!hasError)
        dispatch(
          setSyncingState("synced"),
          dispatch(
            appendLog({
              message: `Saved template with Slug: ${currentState.template.present.slug}`,
              level: "success",
            })
          )
        )
    }
  },
})
