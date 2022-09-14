function replacer(filterObject: Record<string, string[]>, scope: string) {
  return (_match: string, p1: string) => {
    p1 = p1.trim()
    if (p1) {
      filterObject[scope] ? filterObject[scope].push(p1) : (filterObject[scope] = [p1])
    }
    return ""
  }
}

export type FilterObject<T extends string> = Record<T, string[]>

export function createFilterObject<T extends string>(
  filterString: string,
  scopes: T[]
): FilterObject<T> {
  const filterObject = Object.fromEntries(
    scopes.map((scope) => [scope, []] as [T, string[]])
  ) as FilterObject<T>

  for (const scope of scopes) {
    filterString = filterString
      .replace(RegExp(String.raw`${scope}:'(.+?)'`, "g"), replacer(filterObject, scope))
      .replace(RegExp(String.raw`${scope}:"(.+?)"`, "g"), replacer(filterObject, scope))
      .replace(RegExp(String.raw`${scope}:(.+?)(\s|$)`, "g"), replacer(filterObject, scope))
  }

  // Unscoped filters
  for (const scope of scopes) {
    filterString
      .replace(/'(.+?)'/g, replacer(filterObject, scope))
      .replace(/"(.+?)"/g, replacer(filterObject, scope))
      .replace(/(.+?)(\s|$)/g, replacer(filterObject, scope))
  }

  console.log("filter string after: ", filterString)

  return filterObject
}
