import { resolver } from "@blitzjs/rpc"
import { ModuleWrapper } from "@medreporter/medtl-tools"
import db, { Prisma } from "db"
import { createModuleId } from "../utils/idUtils"
import { buildModuleTranslationsArgs } from "../utils/mutationUtils"
import { parseModuleCode } from "../utils/parserUtils"
import { CreateModule } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateModule),
  resolver.authorize(),
  async ({ sourceCode, releaseStatus }, { session }) => {
    const document = parseModuleCode(sourceCode)
    const wrapper = new ModuleWrapper(document)
    const translations = buildModuleTranslationsArgs(wrapper)
    const languages = wrapper.getTranslator().getSupportedLanguages()

    return await db.module.create({
      data: {
        moduleId: createModuleId(),
        authorId: session.userId,
        sourceCode: sourceCode.trim(),
        document: document as unknown as Prisma.JsonObject,
        releaseStatus,
        languages,
        translations,
      },
      select: { moduleId: true },
    })
  }
)
