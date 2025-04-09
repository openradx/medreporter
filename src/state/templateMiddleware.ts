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
} from "./templateSlice"

export const templateMiddleware = createListenerMiddleware()
const startAppListening = templateMiddleware.startListening.withTypes<RootState, AppDispatch>()
startAppListening({
  matcher: isAnyOf(undo, redo, resetTemplate, addNode, deleteNode, moveNode, updateNode),
  effect: async (_, listenerApi) => {
    const currentState = listenerApi.getState()
    const { dispatch } = listenerApi

    // This middleware is only executed for already existing templates.
    // New templates are created directly in NewTemplate component.
    if (!currentState.template.present.id) {
      throw new Error("Missing template id in template middleware.")
    }

    try {
      dispatch(setSyncingState("syncing"))
      await trpcVanilla.templates.updateTemplate.mutate(currentState.template.present)
      dispatch(setSyncingState("synced"))
      dispatch(
        appendLog({
          message: `Saved template with Slug: ${currentState.template.present.slug}`,
          level: "success",
        })
      )
    } catch (error) {
      dispatch(setSyncingState("error"))
      dispatch(
        appendLog({
          message: `Error: ${(error as Error).message}`,
          level: "error",
        })
      )
    }
  },
})
