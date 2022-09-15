import { Button, Checkbox, Group, Stack, Text, TextInput, Title } from "@mantine/core"
import { useAppSession } from "app/core/hooks/useAppSession"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { LanguageSelector } from "../common/LanguageSelector"
import { VisibilitySelector } from "../common/VisibilitySelector"

export const NewModule = () => {
  const { t } = useSiteTranslation()
  const { username } = useAppSession()

  return (
    <Stack spacing="lg" sx={{ maxWidth: 500 }}>
      <Title order={3}>{t("NewModule.formTitle")}</Title>
      <Group>
        <Text sx={{ marginTop: 40 }}>{username} /</Text>
        <TextInput
          label={t("NewModule.inputLabelModuleName")}
          description={t("NewModule.inputDescriptionModuleName")}
          sx={{ flex: 1 }}
        />
      </Group>
      <LanguageSelector />
      <Checkbox label={t("NewModule.inputLabelMultilingual")} />
      <VisibilitySelector />
      <Group>
        <Button color="green">{t("NewModule.buttonCreateModule")}</Button>
      </Group>
    </Stack>
  )
}
