import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Button, Group, Stack } from "@mantine/core"
import { useState, ReactNode, PropsWithoutRef } from "react"
import { FormProvider, useForm, UseFormProps } from "react-hook-form"
import { z } from "zod"

interface OnSubmitResult {
  SUBMIT_FORM_ERROR?: string
  [prop: string]: any
}

export interface SubmitFormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<null | OnSubmitResult>
  initialValues?: UseFormProps<z.infer<S>>["defaultValues"]
  children?: ReactNode
}

export const SUBMIT_FORM_ERROR = "SUBMIT_FORM_ERROR"

export const SubmitForm = <S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: SubmitFormProps<S>) => {
  const ctx = useForm<z.infer<S>>({
    mode: "onBlur",
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  })
  const [formError, setFormError] = useState<string | null>(null)

  const canSubmit =
    ctx.formState.isValid && !ctx.formState.isValidating && !ctx.formState.isSubmitting

  return (
    <FormProvider {...ctx}>
      <form
        onSubmit={ctx.handleSubmit(async (values) => {
          const result = (await onSubmit(values)) || {}
          for (const [key, value] of Object.entries(result)) {
            if (key === SUBMIT_FORM_ERROR) {
              setFormError(value)
            } else {
              ctx.setError(key as any, {
                type: "submit",
                message: value,
              })
            }
          }
        })}
        className="form"
        {...props}
      >
        <Stack spacing="md">
          {formError && <Alert color="red">{formError}</Alert>}

          {children}

          {submitText && (
            <Group mt="sm">
              <Button type="submit" color="green" disabled={!canSubmit}>
                {submitText}
              </Button>
            </Group>
          )}
        </Stack>
      </form>
    </FormProvider>
  )
}
