import { zodResolver } from "@hookform/resolvers/zod"
import { MultiSelect } from "@mantine/core"
import appConfig from "app.config"
import copy from "fast-copy"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import { z } from "zod"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { templateNodeSchema } from "~/schemas/template"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { selectTemplate, updateNode } from "~/state/templateSlice"
import { InfoProperty } from "./properties/InfoProperty"
import { SelectPropertyInput } from "./properties/SelectPropertyInput"
import { TextInputPropertyInput } from "./properties/TextInputPropertyInput"
import { TextareaPropertyInput } from "./properties/TextareaPropertyInput"

export const TemplatePropertiesForm = <S extends z.ZodType<any, any>>() => {
  const { t } = useSiteTranslation()

  const template = useAppSelector(selectTemplate)
  const { nodeId } = template
  const methods = useForm({
    mode: "all",
    resolver: zodResolver(templateNodeSchema.omit({ nodeId: true, type: true })),
    defaultValues: template,
  })

  const dispatch = useAppDispatch()

  const { watch, handleSubmit } = methods

  const debounced = useDebouncedCallback((changedValues: z.infer<S>) => {
    dispatch(updateNode({ nodeId, data: copy(changedValues) }))
  }, 200)

  useEffect(() => {
    const subscription = watch(() => handleSubmit(debounced)())
    return () => subscription.unsubscribe()
  }, [watch, handleSubmit, debounced])

  return (
    <FormProvider {...methods}>
      <TextInputPropertyInput name="name" label={t("TemplatePropertiesModal.nameLabel")} />
      <TextInputPropertyInput name="title" label={t("TemplatePropertiesModal.titleLabel")} />
      <SelectPropertyInput
        name="language"
        label={t("TemplatePropertiesModal.languageLabel")}
        data={appConfig.supportedTemplateLanguages.map((language) => ({
          value: language,
          label: t(`languages.${language}`),
        }))}
      />
      <TextareaPropertyInput
        name="description"
        label={t("TemplatePropertiesModal.descriptionLabel")}
      />
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
      <InfoProperty />
    </FormProvider>
  )
}
