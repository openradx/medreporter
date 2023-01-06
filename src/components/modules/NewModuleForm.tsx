import { Checkbox, Group, Stack, Text, TextInput, Title } from "@mantine/core"
import appConfig from "app.config"
import { useRouter } from "next/router"
import { Controller } from "react-hook-form"
import { useAuthenticatedUser } from "~/hooks/useAuthenticatedUser"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { FormSubmitError } from "~/utils/formErrors"
import { trpc } from "~/utils/trpc"
import { buildCreateModuleSchema } from "~/validations/common"
import { CategoriesSelector } from "../common/CategoriesSelector"
import { DraftLanguageSelector } from "../common/DraftLanguageSelector"
import { SubmitForm } from "../common/SubmitForm"
import { VisibilitySelector } from "../common/VisibilitySelector"

export const NewModuleForm = () => {
  const { t } = useSiteTranslation()
  const user = useAuthenticatedUser()
  const router = useRouter()

  const fetchOwnModule = trpc.common.fetchOwnModule.useMutation()
  const createModule = trpc.common.createModule.useMutation()

  const CreateModuleSchema = buildCreateModuleSchema(t)
  const CreateModuleSchemaExtended = CreateModuleSchema.extend({
    name: CreateModuleSchema.shape.name.refine(
      async (name) => !(await fetchOwnModule.mutateAsync({ name })),
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
            const createdModule = await createModule.mutateAsync(values)
            router.push({
              pathname: "/modules/[username]/[moduleName]/edit",
              query: { username: user.username, moduleName: createdModule.name },
            })
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
