import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Button, Group, Stack } from "@mantine/core"
import { useState, ReactNode, PropsWithoutRef } from "react"
import { FormProvider, useForm, UseFormProps } from "react-hook-form"
import { z } from "zod"
import { FormSubmitError, SUBMIT_FORM_ERROR } from "~/utils/formErrors"

export interface SubmitFormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void>
  initialValues?: UseFormProps<z.infer<S>>["defaultValues"]
  children?: ReactNode
}

export const SubmitForm = <S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: SubmitFormProps<S>) => {
  const methods = useForm<z.infer<S>>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  })

  const submitting = methods.formState.isSubmitting

  const [formError, setFormError] = useState<string | null>(null)

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(async (values) => {
          try {
            await onSubmit(values)
          } catch (e) {
            if (e instanceof FormSubmitError) {
              if (typeof e.error === "string") {
                setFormError(e.error)
              } else {
                for (const [key, value] of Object.entries(e.error)) {
                  if (key === SUBMIT_FORM_ERROR) {
                    setFormError(value)
                  } else {
                    methods.setError(key as any, {
                      type: "submit",
                      message: value,
                    })
                  }
                }
              }
            } else {
              throw e
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
              <Button type="submit" color="green" disabled={submitting}>
                {submitText}
              </Button>
            </Group>
          )}
        </Stack>
      </form>
    </FormProvider>
  )
}
