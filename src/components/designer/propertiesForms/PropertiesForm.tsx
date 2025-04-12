import { zodResolver } from "@hookform/resolvers/zod"
import { Stack } from "@mantine/core"
import copy from "fast-copy"
import { ReactNode, useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import { z } from "zod"
import { useAppDispatch } from "~/state/store"
import { updateNode } from "~/state/templateSlice"

interface PropertiesFormProps<S extends z.ZodType<any, any>> {
  nodeId: string
  schema: S
  initialValues: z.infer<S>
  children: ReactNode
}

export const PropertiesForm = <S extends z.ZodType<any, any>>({
  nodeId,
  schema,
  initialValues,
  children,
}: PropertiesFormProps<S>) => {
  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  })

  const dispatch = useAppDispatch()
  const updateNodeDebounced = useDebouncedCallback((values) => {
    try {
      dispatch(updateNode({ nodeId, data: copy(schema.parse(values)) }))
    } catch (error) {}
  }, 500)

  const { watch } = methods
  useEffect(() => {
    const subscription = watch((value) => {
      updateNodeDebounced(value)
    })
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormProvider {...methods}>
      <form>
        <Stack gap="xs">{children}</Stack>
      </form>
    </FormProvider>
  )
}
