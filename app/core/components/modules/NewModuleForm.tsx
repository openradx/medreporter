import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Checkbox, Group, Stack, Text, TextInput, Title } from "@mantine/core"
import appConfig from "app.config"
import { useRouter } from "next/router"
import { Controller } from "react-hook-form"
import { useAuthenticatedAppSession } from "app/core/hooks/useAuthenticatedAppSession"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import createModule from "app/core/mutations/createModule"
import fetchOwnModule from "app/core/mutations/fetchOwnModule"
import { FormSubmitError } from "app/core/utils/formErrors"
import { buildCreateModule } from "app/core/validations"
import { CategoriesSelector } from "../common/CategoriesSelector"
import { DraftLanguageSelector } from "../common/DraftLanguageSelector"
import { SubmitForm } from "../common/SubmitForm"
import { VisibilitySelector } from "../common/VisibilitySelector"

export const NewModuleForm = () => {
  const { t } = useSiteTranslation()
  const { username } = useAuthenticatedAppSession()
  const router = useRouter()

  const [fetchOwnModuleMutation] = useMutation(fetchOwnModule)
  const [createModuleMutation] = useMutation(createModule)

  const CreateModuleSchema = buildCreateModule(t)
  const CreateModuleSchemaExtended = CreateModuleSchema.extend({
    name: CreateModuleSchema.shape.name.refine(
      async (name) => !(await fetchOwnModuleMutation({ name })),
      { message: t("formError.alreadyUsed") }
    ),
  })

  return (
    <Stack>
      <Title order={3}>{t("NewModuleForm.formTitle")}</Title>
      <SubmitForm
        submitText={t("NewModuleForm.buttonCreateModule")}
        schema={CreateModuleSchemaExtended}
        initialValues={{
          name: "",
          multilingual: false,
          defaultLanguage: "en",
          visibility: "PUBLIC",
          categories: [],
        }}
        onSubmit={async (values) => {
          try {
            const createdModule = await createModuleMutation(values)
            router.push(Routes.EditModulePage({ username, moduleName: createdModule.name }))
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
            <Text sx={{ marginTop: 32 }}>{username} /</Text>
            <Controller
              name="name"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label={t("NewModuleForm.inputLabelModuleName")}
                  sx={{ flex: 1 }}
                  error={error ? error.message : null}
                  required
                />
              )}
            />
          </Group>
          <Controller
            name="multilingual"
            render={({ field }) => (
              <Checkbox {...field} label={t("NewModuleForm.inputLabelMultilingual")} />
            )}
          />
          <Controller
            name="defaultLanguage"
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
