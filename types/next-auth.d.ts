import { Institute, MembershipRole, UserRole } from "@prisma/client"
import { User as NextAuthUser } from "next-auth"

type Role = MembershipRole | UserRole

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      username: string
      roles: Array<Role>
      currentInstituteId: Institute["id"] | null
    }
  }

  interface User extends NextAuthUser {
    username: string
    roles: Array<Role>
    currentInstituteId: Institute["id"] | null
  }
}
