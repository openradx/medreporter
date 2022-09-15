import { resolver } from "@blitzjs/rpc"
import { ModuleWrapper } from "@medreporter/medtl-tools"
import db, { Prisma, ReleaseStatus } from "db"
import { buildModuleTranslationsArgs } from "../utils/mutationUtils"
import { parseModuleCode } from "../utils/parserUtils"
import { CreateModule } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateModule),
  resolver.authorize(),
  async ({ name, sourceCode, multilingual, defaultLanguage, visibility }, { session }) => {
    const document = parseModuleCode(sourceCode)
    const wrapper = new ModuleWrapper(document)
    const translations = buildModuleTranslationsArgs(wrapper)
    const languages = wrapper.getTranslator().getSupportedLanguages()

    return await db.module.create({
      data: {
        name,
        authorId: session.userId,
        sourceCode: "",
        document: {} as unknown as Prisma.JsonObject,
        translations,
        visibility,
        releaseStatus: ReleaseStatus.DRAFT,
      },
      select: { name: true },
    })
  }
)
