import { resolver } from "@blitzjs/rpc"
import { ModuleWrapper } from "@medreporter/medtl-tools"
import db, { Prisma, ReleaseStatus } from "db"
import { buildModuleTranslationsArgs } from "../utils/mutationUtils"
import { parseModuleCode } from "../utils/parserUtils"
import { CreateModule } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateModule),
  resolver.authorize(),
  async ({ name, multilingual, defaultLanguage, visibility }, { session }) => {
    const sourceCode = "" // TODO: create default draft with langauge and multilingual params
    const document = parseModuleCode(sourceCode)
    const wrapper = new ModuleWrapper(document)
    const translations = buildModuleTranslationsArgs(wrapper)

    return await db.module.create({
      data: {
        name,
        authorId: session.userId,
        sourceCode,
        document: document as unknown as Prisma.JsonObject,
        translations,
        visibility,
        releaseStatus: ReleaseStatus.DRAFT,
      },
      select: { name: true },
    })
  }
)
