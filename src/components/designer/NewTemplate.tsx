import { zodResolver } from "@hookform/resolvers/zod"
import { useLingui as useLinguiLazy } from "@lingui/react"
import { useLingui as useLinguiMacro } from "@lingui/react/macro"
import { Button, Container, Flex, ScrollArea } from "@mantine/core"
import { ReleaseStatus, Visibility } from "@prisma/client"
import appConfig from "app.config"
import { useRouter } from "next/router"
import { useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  CATEGORIES,
  ERROR_MESSAGES,
  LANGUAGES,
  RELEASE_STATUS,
  VISIBILITY,
} from "~/constants/lazy-translations"
import { useUser } from "~/hooks/useUser"
import { buildTemplateNodeSchema, TemplateNode } from "~/schemas/template"
import { useAppSelector } from "~/state/store"
import { selectTemplate } from "~/state/templateSlice"
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
  const { t } = useLinguiMacro()
  const { _ } = useLinguiLazy()

  const user = useUser()
  const router = useRouter()
  const template = useAppSelector(selectTemplate)

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(
      buildTemplateNodeSchema(_(ERROR_MESSAGES["invalidSlug"])).omit({ nodeId: true, type: true })
    ),
    defaultValues: template,
  })

  const { handleSubmit } = methods

  const createTemplateMutation = trpc.templates.createTemplate.useMutation()

  const isMutationLoadingRef = useRef(false)
  const onSubmit = (changedValues: FormValues) => {
    isMutationLoadingRef.current = true
    const newTemplate: TemplateNode = {
      ...template,
      slug: changedValues.slug,
      title: changedValues.title,
      language: changedValues.language,
      description: changedValues.description,
      visibility: changedValues.visibility,
      releaseStatus: changedValues.releaseStatus,
      categories: changedValues.categories,
    }
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
      <Container size="xs" h="100%" mih={0}>
        <ScrollArea h="100%" mih={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInputPropertyInput name="slug" label={t`URL Slug`} required />
            <TextInputPropertyInput name="title" label={t`Title`} required />
            <SelectPropertyInput
              name="language"
              label={t`Language`}
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
              minRows={6}
              maxRows={6}
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
              <Button
                type="submit"
                variant="light"
                mt={16}
                disabled={!methods.formState.isValid}
                loading={isMutationLoadingRef.current}
              >
                {t`Create`}
              </Button>
            </Flex>
          </form>
        </ScrollArea>
      </Container>
    </FormProvider>
  )
}
