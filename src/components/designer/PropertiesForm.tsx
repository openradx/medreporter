import { zodResolver } from "@hookform/resolvers/zod"
import { Stack } from "@mantine/core"
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
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  })

  useEffect(() => {
    methods.reset(initialValues)
  }, [initialValues, methods, nodeId])

  const dispatch = useAppDispatch()

  const { watch, handleSubmit } = methods

  const debounced = useDebouncedCallback((changedValues: z.infer<S>) => {
    dispatch(updateNode({ nodeId, data: changedValues }))
  }, 200)

  useEffect(() => {
    const subscription = watch(handleSubmit(debounced))
    return () => subscription.unsubscribe()
  }, [watch, handleSubmit, debounced])

  return (
    <FormProvider {...methods}>
      <form>
        <Stack gap="xs">{children}</Stack>
      </form>
    </FormProvider>
  )
}
