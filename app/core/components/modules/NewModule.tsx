import { Button, Checkbox, Group, Select, Stack, Text, TextInput, Title } from "@mantine/core"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"

export const NewModule = () => {
  const { t } = useSiteTranslation()

  return (
    <Stack spacing="lg" sx={{ maxWidth: 500 }}>
      <Title order={3}>{t("NewModule.formTitle")}</Title>
      <Group>
        <Text sx={{ marginTop: 40 }}>Userfoo /</Text>
        <TextInput
          label={t("NewModule.inputLabelModuleName")}
          description={t("NewModule.inputDescriptionModuleName")}
          sx={{ flex: 1 }}
        />
      </Group>
      <Select
        label={t("NewModule.inputLabelMainLanguage")}
        description={t("NewModule.inputDescriptionMainLanguage")}
        data={[]}
      />
      <Checkbox label={t("NewModule.inputLabelMultilingual")} />
      <Group>
        <Button color="green">{t("NewModule.buttonCreateModule")}</Button>
      </Group>
    </Stack>
  )
}
