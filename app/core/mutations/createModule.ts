import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { createModuleId } from "../utils/idUtils"
import { getLanguages } from "../utils/medtUtils"
import { buildModuleTranslationsArgs } from "../utils/mutationUtils"
import { parseModuleCode } from "../utils/parserUtils"
import { CreateModule } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateModule),
  resolver.authorize(),
  async ({ sourceCode, releaseStatus }, { session }) => {
    let languages: string[] = []
    let translations: Prisma.ModuleUpdateArgs["data"]["translations"] = {}

    try {
      const document = parseModuleCode(sourceCode)
      const languages = getLanguages(document)
      translations = buildModuleTranslationsArgs(wrapper)
    } catch (error) {}

    return await db.module.create({
      data: {
        moduleId: createModuleId(),
        authorId: session.userId,
        sourceCode: sourceCode.trim(),
        document,
        releaseStatus,
        languages,
        translations,
      },
      select: { moduleId: true },
    })
  }
)
