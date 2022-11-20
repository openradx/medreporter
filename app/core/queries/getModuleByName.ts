import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db from "db"
import { GetModule } from "../validations"

export default resolver.pipe(resolver.zod(GetModule), async ({ username, moduleName }) => {
  const _module = await db.module.findFirst({
    where: { author: { username }, name: moduleName },
    include: { author: { select: { email: true, username: true } } },
  })

  if (!_module) {
    throw new NotFoundError(`No module from author "${username}" with name "${moduleName}".`)
  }

  return _module
})
