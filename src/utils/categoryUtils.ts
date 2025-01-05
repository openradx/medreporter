import appConfig from "app.config"

const categoryToGroupMap: Record<string, string> = {}
for (const [group, categories] of Object.entries(appConfig.availableCategories)) {
  for (const category of categories) {
    categoryToGroupMap[category] = group
  }
}

export function getGroupForCategory(category: string): string {
  return categoryToGroupMap[category]
}

const emptyCategoryGroups = Object.fromEntries(
  Object.keys(appConfig.availableCategories).map((group) => [group, []])
)

export function getEmptyCategoryGroups(): Record<string, string[]> {
  return JSON.parse(JSON.stringify(emptyCategoryGroups))
}
