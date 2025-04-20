import { useLingui } from "@lingui/react/macro"
import { useEffect } from "react"
import { appendToLog, updateStatus } from "~/state/displaySlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { selectTemplate } from "~/state/templateSlice"
import { trpc } from "~/utils/trpc"

const SYNC_TEMPLATE_KEY = "syncTemplate"

export const useSyncTemplate = () => {
  const template = useAppSelector(selectTemplate)
  const dispatch = useAppDispatch()
  const updateTemplate = trpc.templates.updateTemplate.useMutation()
  const { t } = useLingui()

  useEffect(() => {
    dispatch(
      updateStatus({
        statusId: SYNC_TEMPLATE_KEY,
        status: {
          message: t`Syncing template...`,
          state: "doing",
        },
      })
    )
    dispatch(appendToLog({ message: t`Syncing template...`, level: "info" }))
    updateTemplate.mutate(template, {
      onSuccess: () => {
        dispatch(
          updateStatus({
            statusId: SYNC_TEMPLATE_KEY,
            status: { message: t`Sync done`, state: "ok" },
          })
        )
        dispatch(appendToLog({ message: t`Sync done`, level: "info" }))
      },
      onError: (error) => {
        dispatch(
          updateStatus({
            statusId: SYNC_TEMPLATE_KEY,
            status: { message: error.message, state: "error" },
          })
        )
        dispatch(appendToLog({ message: t`Sync error: ${error.message}`, level: "error" }))
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template])
}
