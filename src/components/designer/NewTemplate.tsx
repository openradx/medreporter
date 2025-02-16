import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Flex } from "@mantine/core"
import { ReleaseStatus, Visibility } from "@prisma/client"
import appConfig from "app.config"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { useUser } from "~/hooks/useUser"
import { buildTemplateNodeSchema } from "~/schemas/template"
import { useAppSelector } from "~/state/store"
import { createEmptyTemplate, selectTemplate } from "~/state/templateSlice"
import { trpc } from "~/utils/trpc"
import { MultiSelectPropertyInput } from "./properties/MultiSelectPropertyInput"
import { SelectPropertyInput } from "./properties/SelectPropertyInput"
import { TextInputPropertyInput } from "./properties/TextInputPropertyInput"
import { TextareaPropertyInput } from "./properties/TextareaPropertyInput"

interface FormValues {
  slug: string
  title: string
  language: string
  description: string
  categories: string[]
  visibility: Visibility
  releaseStatus: ReleaseStatus
}

export const NewTemplate = () => {
  const { t } = useSiteTranslation()
  const user = useUser()
  const router = useRouter()
  const template = useAppSelector(selectTemplate)

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(buildTemplateNodeSchema(t).omit({ nodeId: true, type: true })),
    defaultValues: template,
  })

  const { handleSubmit } = methods

  const createTemplateMutation = trpc.templates.createTemplate.useMutation()

  const onSubmit = (changedValues: FormValues) => {
    const newTemplate = createEmptyTemplate()
    newTemplate.id = "" as const
    newTemplate.slug = changedValues.slug
    newTemplate.title = changedValues.title
    newTemplate.language = changedValues.language
    newTemplate.description = changedValues.description
    newTemplate.visibility = changedValues.visibility
    newTemplate.releaseStatus = changedValues.releaseStatus
    newTemplate.categories = changedValues.categories
    createTemplateMutation.mutate(newTemplate, {
      onSuccess: () => {
        const { username } = user!
        if (!username) throw new Error("User must be logged in to create a template.")
        const slug = changedValues.slug as string
        const newPath = `/templates/${username}/${slug}` as any
        router.push({ pathname: newPath, query: { edit: "true" } })
      },
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInputPropertyInput
          name="slug"
          label={t("TemplatePropertiesForm.slugLabel")}
          required
        />
        <TextInputPropertyInput
          name="title"
          label={t("TemplatePropertiesForm.titleLabel")}
          required
        />
        <SelectPropertyInput
          name="language"
          label={t("TemplatePropertiesForm.languageLabel")}
          data={appConfig.supportedTemplateLanguages.map((language) => ({
            value: language,
            label: t(`languages.${language}`),
          }))}
          required
        />
        <TextareaPropertyInput
          name="description"
          label={t("TemplatePropertiesForm.descriptionLabel")}
          autosize
          minRows={4}
          maxRows={4}
        />
        <MultiSelectPropertyInput
          name="categories"
          label={t("TemplatePropertiesForm.categoriesLabel")}
          data={Object.entries(appConfig.availableCategories).map(([group, categories]) => ({
            group: t(`categories.group.${group}`),
            items: categories.map((category) => ({
              value: category,
              label: t(`categories.${category}`),
            })),
          }))}
        />
        <SelectPropertyInput
          name="visibility"
          label={t("TemplatePropertiesForm.visibilityLabel")}
          data={Object.entries(Visibility).map(([value, label]) => ({
            value,
            label: t(`visibility.${label}`),
          }))}
        />
        <SelectPropertyInput
          name="releaseStatus"
          label={t("TemplatePropertiesForm.releaseStatusLabel")}
          data={Object.entries(ReleaseStatus).map(([value, label]) => ({
            value,
            label: t(`releaseStatus.${label}`),
          }))}
        />

        <Flex justify="center">
          <Button type="submit" mt={16} disabled={!methods.formState.isValid}>
            {t("general.buttonClose")}
          </Button>
        </Flex>
      </form>
    </FormProvider>
  )
}
