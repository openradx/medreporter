import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Group, Modal, Stack } from "@mantine/core"
import copy from "fast-copy"
import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import { z } from "zod"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import {
  MultipleChoiceFieldNode,
  Option,
  SingleChoiceFieldNode,
  optionsSchema,
} from "~/schemas/structure"
import { useAppDispatch } from "~/state/store"
import { updateNode } from "~/state/templateSlice"
import { OptionsTable } from "./OptionsTable"

interface OptionsEditorModalProps {
  opened: boolean
  onClose: () => void
  node: SingleChoiceFieldNode | MultipleChoiceFieldNode
}

export const OptionsEditorModal = ({ opened, onClose, node }: OptionsEditorModalProps) => {
  const { t } = useSiteTranslation()
  const dispatch = useAppDispatch()

  const { control, handleSubmit, watch, getValues } = useForm({
    mode: "all",
    resolver: zodResolver(z.object({ options: optionsSchema })),
    defaultValues: { options: node.options },
  })
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "options",
  })

  const debounced = useDebouncedCallback((data: Option[]) => {
    dispatch(updateNode({ nodeId: node.nodeId, data: { options: copy(data) } }))
  }, 200)

  useEffect(() => {
    const subscription = watch(() => {
      handleSubmit((data) => {
        debounced(data.options)
      })()
    })
    return () => subscription.unsubscribe()
  }, [watch, handleSubmit, debounced])

  const appendOption = () => {
    const num = getValues("options").length + 1
    return append({ label: `Option ${num}`, value: `option-${num}` })
  }

  return (
    <Modal size="lg" title={t("OptionsEditorModal.modalTitle")} opened={opened} onClose={onClose}>
      <form>
        <Stack>
          <OptionsTable control={control} fields={fields} move={move} remove={remove} />
          <Group justify="center">
            <Button variant="outline" type="button" onClick={appendOption}>
              {t("OptionsEditorModal.addOptionLabel")}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
