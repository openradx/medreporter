import { Checkbox, Group, Stack, Text, TextInput, Title } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useAppSession } from "app/core/hooks/useAppSession"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { CreateModule } from "app/core/validations"
import { CategoriesSelector } from "../common/CategoriesSelector"
import { LanguageSelector } from "../common/LanguageSelector"
import { SubmitForm } from "../common/SubmitForm"
import { VisibilitySelector } from "../common/VisibilitySelector"

export const NewModule = () => {
  const { t, i18n } = useSiteTranslation()
  const { username } = useAppSession()

  return (
    <Stack>
      <Title order={3}>{t("NewModule.formTitle")}</Title>
      <SubmitForm
        submitText={t("NewModule.buttonCreateModule")}
        schema={CreateModule}
        initialValues={{
          name: "",
          multilingual: false,
          defaultLanguage: "en",
          visibility: "PUBLIC",
          categories: [],
        }}
        onSubmit={async (values) => {
          const i = 0
          return null
        }}
      >
        <Stack sx={{ maxWidth: 500 }}>
          <Group>
            <Text sx={{ marginTop: 40 }}>{username} /</Text>
            <Controller
              name="name"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextInput
                  label={t("NewModule.inputLabelModuleName")}
                  sx={{ flex: 1 }}
                  value={value}
                  onChange={onChange}
                  error={error ? error.message : null}
                  required
                />
              )}
            />
          </Group>
          <Controller
            name="multilingual"
            render={({ field: { value, onChange } }) => (
              <Checkbox
                label={t("NewModule.inputLabelMultilingual")}
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            name="defaultLanguage"
            render={({ field: { value, onChange } }) => (
              <LanguageSelector
                value={value}
                onChange={onChange}
                languages={i18n.languages as string[]}
              />
            )}
          />
          <Controller
            name="visibility"
            render={({ field: { value, onChange } }) => (
              <VisibilitySelector value={value} onChange={onChange} />
            )}
          />
          <Controller
            name="categories"
            render={({ field: { value, onChange } }) => (
              <CategoriesSelector value={value} onChange={onChange} />
            )}
          />
        </Stack>
      </SubmitForm>
    </Stack>
  )
}
