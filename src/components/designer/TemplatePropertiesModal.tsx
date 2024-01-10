import { Button, Modal, MultiSelect, Select, TextInput, Textarea } from "@mantine/core"
import { appConfig } from "~/appConfig"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

interface TemplatePropertiesModalProps {
  opened: boolean
  onClose: () => void
}

export const TemplatePropertiesModal = ({ opened, onClose }: TemplatePropertiesModalProps) => {
  const { t } = useSiteTranslation()

  return (
    <Modal opened={opened} onClose={onClose} title="New Template - Properties">
      <TextInput label={t("TemplatePropertiesModal.identifierLabel")} />
      <TextInput label={t("TemplatePropertiesModal.titleLabel")} />
      <Select
        label={t("TemplatePropertiesModal.languageLabel")}
        searchable
        data={appConfig.supportedTemplateLanguages.map((language) => ({
          value: language,
          label: t(`languages.${language}`),
        }))}
        maxDropdownHeight={100}
      />
      <Textarea label={t("TemplatePropertiesModal.descriptionLabel")} />
      <MultiSelect
        label={t("TemplatePropertiesModal.categoriesLabel")}
        searchable
        data={Object.entries(appConfig.availableCategories).map(([group, categories]) => ({
          group: t(`categories.group.${group}`),
          items: categories.map((category) => ({
            value: category,
            label: t(`categories.${category}`),
          })),
        }))}
        clearable
      />
      <Button onClick={onClose} mt={16}>
        {t("general.buttonClose")}
      </Button>
    </Modal>
  )
}
