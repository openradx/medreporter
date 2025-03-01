import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Flex } from "@mantine/core"
import { Visibility, ReleaseStatus } from "@prisma/client"
import appConfig from "app.config"
import copy from "fast-copy"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { useUser } from "~/hooks/useUser"
import { buildTemplateNodeSchema } from "~/schemas/template"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { selectTemplate, updateNode } from "~/state/templateSlice"
import { MultiSelectPropertyInput } from "./properties/MultiSelectPropertyInput"
import { SelectPropertyInput } from "./properties/SelectPropertyInput"
import { TextInputPropertyInput } from "./properties/TextInputPropertyInput"
import { TextareaPropertyInput } from "./properties/TextareaPropertyInput"

export type TemplatePropertiesFormProps = {
  onClose: () => void
}
export const TemplatePropertiesForm = <S extends z.ZodType<any, any>>({
  onClose,
}: TemplatePropertiesFormProps) => {
  const { t } = useSiteTranslation()

  const template = useAppSelector(selectTemplate)
  const { nodeId } = template
  const methods = useForm({
    mode: "all",
    resolver: zodResolver(buildTemplateNodeSchema(t).omit({ nodeId: true, type: true })),
    defaultValues: template,
  })

  const dispatch = useAppDispatch()

  const router = useRouter()
  const user = useUser()

  const { handleSubmit } = methods

  const onSubmit = (changedValues: z.infer<S>) => {
    dispatch(updateNode({ nodeId, data: copy(changedValues) }, false))

    const { username } = user!
    if (!username) throw new Error("User must be logged in to create a template.")
    const slug = changedValues.slug as string
    const newPath = `/templates/${username}/${slug}` as any
    router.replace({ pathname: newPath, query: { edit: "true" } }, undefined, { shallow: true })

    onClose()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
