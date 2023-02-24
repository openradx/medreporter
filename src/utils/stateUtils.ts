import { ResourceState } from "~/state/resourcesSlice"
import { ResourceWithAuthor } from "~/types/router"

export function transformResource(resource: ResourceWithAuthor): ResourceState {
  const { createdAt, updatedAt, ...rest } = resource
  return {
    ...rest,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  }
}
