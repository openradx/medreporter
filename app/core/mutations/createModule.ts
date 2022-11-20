import { resolver } from "@blitzjs/rpc"
import { ModuleWrapper } from "@medreporter/medtl-tools"
import db, { Prisma, ReleaseStatus } from "db"
import { createModuleDraft } from "../utils/moduleUtils"
import { buildModuleTranslationsArgs } from "../utils/mutationUtils"
import { parseModuleCode } from "../utils/parserUtils"
import { buildCreateModule } from "../validations"

export default resolver.pipe(
  resolver.zod(buildCreateModule()),
  resolver.authorize(),
  async ({ name, multilingual, defaultLanguage, visibility }, { session }) => {
    const code = createModuleDraft(name, multilingual, defaultLanguage)
    const document = parseModuleCode(code)
    const wrapper = new ModuleWrapper(document)
    const translations = buildModuleTranslationsArgs(wrapper)

    const createdModule = await db.module.create({
      data: {
        name,
        authorId: session.userId,
        code,
        document: document as unknown as Prisma.JsonObject,
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
