import { MembershipRole, UserRole } from "@prisma/client"
import { Session } from "~/types/general"

type Role = MembershipRole | UserRole

export function hasRole(user: Session["user"], roleOrRoles: Role | Role[]) {
  for (const role of user.roles) {
    if (Array.isArray(roleOrRoles)) {
      if (roleOrRoles.includes(role)) {
        return true
      }
    } else if (roleOrRoles === role) {
      return true
    }
  }

  return false
}
