import { resolver } from "@blitzjs/rpc"
import db from "db"
import { FetchOwnModule } from "../validations"

export default resolver.pipe(
  resolver.zod(FetchOwnModule),
  resolver.authorize(),
  async ({ name }, { session: { userId } }) =>
    await db.module.findUnique({
      where: { authorId_name: { authorId: userId, name } },
    })
)
