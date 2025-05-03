import { zodResolver } from "@hookform/resolvers/zod"
import { useLingui as useLinguiLazy } from "@lingui/react"
import { useLingui as useLinguiMacro } from "@lingui/react/macro"
import { Button, Flex } from "@mantine/core"
import { Visibility, ReleaseStatus } from "@prisma/client"
import appConfig from "app.config"
import copy from "fast-copy"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import {
  CATEGORIES,
  ERROR_MESSAGES,
  LANGUAGES,
  RELEASE_STATUS,
  VISIBILITY,
} from "~/constants/lazy-translations"
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
  const { t } = useLinguiMacro()
  const { _ } = useLinguiLazy()

  const template = useAppSelector(selectTemplate)
  const { nodeId } = template
  const methods = useForm({
    mode: "all",
    resolver: zodResolver(
      buildTemplateNodeSchema(_(ERROR_MESSAGES["invalidSlug"])).omit({ nodeId: true, type: true })
    ),
    defaultValues: template,
  })

  const dispatch = useAppDispatch()

  const router = useRouter()
  const user = useUser()

  const { handleSubmit } = methods

  const onSubmit = (changedValues: z.infer<S>) => {
    dispatch(updateNode({ nodeId, data: copy(changedValues) }, false))

    const { username } = user!
    if (!username) throw new Error(t`User must be logged in to create a template.`)
    const slug = changedValues.slug as string
    const newPath = `/templates/${username}/${slug}` as any
    router.replace({ pathname: newPath, query: { edit: "true" } }, undefined, { shallow: true })

    onClose()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextInputPropertyInput name="slug" label={t`URL Slug`} required />
        <TextInputPropertyInput name="title" label={t`Title`} required />
        <SelectPropertyInput
          name="language"
          label={t`Languages`}
          data={appConfig.supportedTemplateLanguages.map((language) => ({
            value: language,
            // @ts-expect-error language is a string by next.js
            label: _(LANGUAGES[language]),
          }))}
          required
        />
        <TextareaPropertyInput
          name="description"
          label={t`Description`}
          autosize
          minRows={4}
          maxRows={4}
        />
        <MultiSelectPropertyInput
          name="categories"
          label={t`Categories`}
          data={Object.entries(appConfig.availableCategories).map(([group, categories]) => ({
            // @ts-expect-error group is a string by next.js
            group: _(CATEGORIES.group[group]),
            items: categories.map((category) => ({
              value: category,
              // @ts-expect-error category is a string by next.js
              label: _(CATEGORIES[category]),
            })),
          }))}
        />
        <SelectPropertyInput
          name="visibility"
          label={t`Visibility`}
          data={Object.entries(Visibility).map(([value, label]) => ({
            value,
            label: _(VISIBILITY[label]),
          }))}
        />
        <SelectPropertyInput
          name="releaseStatus"
          label={t`Release status`}
          data={Object.entries(ReleaseStatus).map(([value, label]) => ({
            value,
            label: _(RELEASE_STATUS[label]),
          }))}
        />
        <Flex justify="center">
          <Button type="submit" mt={16} disabled={!methods.formState.isValid}>
            {t`Close`}
          </Button>
        </Flex>
      </form>
    </FormProvider>
  )
}
