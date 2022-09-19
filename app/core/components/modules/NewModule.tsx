import { useMutation } from "@blitzjs/rpc"
import { Checkbox, Group, Stack, Text, TextInput, Title } from "@mantine/core"
import appConfig from "app.config"
import { Controller } from "react-hook-form"
import { useAppSession } from "app/core/hooks/useAppSession"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import fetchOwnModule from "app/core/mutations/fetchOwnModule"
import { buildCreateModule } from "app/core/validations"
import { CategoriesSelector } from "../common/CategoriesSelector"
import { LanguageSelector } from "../common/LanguageSelector"
import { SubmitForm } from "../common/SubmitForm"
import { VisibilitySelector } from "../common/VisibilitySelector"

export const NewModule = () => {
  const { t } = useSiteTranslation()
  const { username } = useAppSession()

  const [fetchOwnModuleMutation] = useMutation(fetchOwnModule)

  const CreateModuleSchema = buildCreateModule(t)
  const CreateModuleSchemaExtended = CreateModuleSchema.extend({
    name: CreateModuleSchema.shape.name.refine(
      async (name) => {
        if (await fetchOwnModuleMutation({ name })) {
          return false
        }
        return true
      },
      { message: "formError.alreadyUsed" }
    ),
  })

  return (
    <Stack>
      <Title order={3}>{t("NewModule.formTitle")}</Title>
      <SubmitForm
        submitText={t("NewModule.buttonCreateModule")}
        schema={CreateModuleSchemaExtended}
        initialValues={{
          name: "",
          multilingual: false,
          defaultLanguage: "en",
          visibility: "PUBLIC",
          categories: [],
        }}
        onSubmit={async (values) => {
          console.log("in new module form", values)
        }}
      >
        <Stack sx={{ maxWidth: 500 }}>
          <Group>
            <Text sx={{ marginTop: 40 }}>{username} /</Text>
            <Controller
              name="name"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label={t("NewModule.inputLabelModuleName")}
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
              <Checkbox {...field} label={t("NewModule.inputLabelMultilingual")} />
            )}
          />
          <Controller
            name="defaultLanguage"
            render={({ field }) => (
              <LanguageSelector {...field} languages={appConfig.structuredReportLanguages} />
            )}
          />
          <Controller name="visibility" render={({ field }) => <VisibilitySelector {...field} />} />
          <Controller name="categories" render={({ field }) => <CategoriesSelector {...field} />} />
        </Stack>
      </SubmitForm>
    </Stack>
  )
}
