import { Group, Stack, Text, TextInput, Title } from "@mantine/core"
import { ResourceType } from "@prisma/client"
import appConfig from "app.config"
import { Controller } from "react-hook-form"
import { z } from "zod"
import { useAuthenticatedUser } from "~/hooks/useAuthenticatedUser"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { FormSubmitError } from "~/utils/formErrors"
import { buildCreateResourceSchema } from "~/validations/resources"
import { CategoriesSelector } from "../common/CategoriesSelector"
import { DraftLanguageSelector } from "../common/DraftLanguageSelector"
import { SubmitForm } from "../common/SubmitForm"
import { VisibilitySelector } from "../common/VisibilitySelector"

interface NewResourceFormProps {
  resourceType: ResourceType
  formTitle: string
  onCheckDuplicate: (name: string) => boolean | Promise<boolean>
  onSubmit: (values: z.infer<ReturnType<typeof buildCreateResourceSchema>>) => void
}

export const NewResourceForm = ({
  resourceType,
  formTitle,
  onCheckDuplicate,
  onSubmit,
}: NewResourceFormProps) => {
  const { t } = useSiteTranslation()
  const user = useAuthenticatedUser()

  const CreateResourceSchema = buildCreateResourceSchema(t)
  const CreateResourceSchemaExtended = CreateResourceSchema.extend({
    name: CreateResourceSchema.shape.name.refine(async (name) => !(await onCheckDuplicate(name)), {
      message: t("formError.alreadyUsed"),
    }),
  })

  return (
    <Stack>
      <Title order={3}>{formTitle}</Title>
      <SubmitForm
        submitText={t("NewResourceForm.createButtonLabel")}
        schema={CreateResourceSchemaExtended}
        initialValues={{
          type: resourceType,
          name: "",
          language: "en",
          visibility: "PUBLIC",
          categories: [],
        }}
        onSubmit={async (values) => {
          try {
            onSubmit(values)
          } catch (e) {
            if (e instanceof Error) {
              throw new FormSubmitError(t("formError.unexpected") + e.message)
            }
            throw e
          }
        }}
      >
        <Stack sx={{ maxWidth: 500 }}>
          <Group align="flex-start">
            <Text sx={{ marginTop: 32 }}>{user.username} /</Text>
            <Controller
              name="name"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label={t("NewResourceForm.nameInputLabel")}
                  sx={{ flex: 1 }}
                  error={error ? error.message : null}
                  required
                />
              )}
            />
          </Group>
          <Controller
            name="language"
            render={({ field }) => (
              <DraftLanguageSelector {...field} languages={appConfig.structuredReportLanguages} />
            )}
          />
          <Controller name="visibility" render={({ field }) => <VisibilitySelector {...field} />} />
          <Controller name="categories" render={({ field }) => <CategoriesSelector {...field} />} />
        </Stack>
      </SubmitForm>
    </Stack>
  )
}
