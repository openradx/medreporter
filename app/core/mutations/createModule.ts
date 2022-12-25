import { resolver } from "@blitzjs/rpc"
import {
  createMonolingualModuleDraft,
  createMultilingualModuleDraft,
  MultilingualModuleDraftContext,
  parseModule,
} from "@medreporter/medtl-tools"
import db, { Prisma, ReleaseStatus } from "db"
import { createClient } from "../utils/i18nServerClient"
import { buildModuleTranslationsArgs } from "../utils/mutationUtils"
import { buildCreateModule } from "../validations"

export default resolver.pipe(
  resolver.zod(buildCreateModule()),
  resolver.authorize(),
  async ({ name, multilingual, defaultLanguage, visibility }, { session }) => {
    const { i18n, initPromise } = createClient({
      preload: [defaultLanguage],
      ns: "drafts",
    })

    await initPromise

    const context: MultilingualModuleDraftContext = {
      lng: i18n.t("Module.lng"),
      title: i18n.t("Module.title"),
      description: i18n.t("Module.description"),
      fieldLabel: i18n.t("Module.fieldLabel"),
    }

    let source: string
    if (multilingual) {
      source = createMultilingualModuleDraft(context)
    } else {
      source = createMonolingualModuleDraft(context)
    }

    const doc = parseModule(source)
    const translations = buildModuleTranslationsArgs(doc)

    const createdModule = await db.module.create({
      data: {
        name,
        authorId: session.userId,
        source,
        document: doc.document as Record<string, any> as Prisma.JsonObject,
        translations,
        visibility,
        releaseStatus: ReleaseStatus.DRAFT,
      },
      select: { id: true, name: true, author: { select: { username: true } } },
    })

    return {
      id: createdModule.id,
      name: createdModule.name,
      author: createdModule.author.username,
    }
  }
)
