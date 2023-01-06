import { User } from "next-auth"
import { Role } from "types/next-auth"

export function hasRole(user: User, roleOrRoles: Role | Role[]) {
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
