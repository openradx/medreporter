const replacer =
  (filterObject: Record<string, string[]>, scope: string) => (_match: string, p1: string) => {
    p1 = p1.trim()
    if (p1) {
      filterObject[scope] ? filterObject[scope].push(p1) : (filterObject[scope] = [p1])
    }
    return ""
  }

export const createFilterObject = (filterString: string, scopes: string[]) => {
  const filterObject: Record<string, string[]> = {}

  for (const scope of scopes) {
    filterString = filterString
      .replace(RegExp(String.raw`${scope}:'(.+?)'`, "g"), replacer(filterObject, scope))
      .replace(RegExp(String.raw`${scope}:"(.+?)"`, "g"), replacer(filterObject, scope))
      .replace(RegExp(String.raw`${scope}:(.+?)(\s|$)`, "g"), replacer(filterObject, scope))
  }

  // Unscoped filters
  filterString
    .replace(/'(.+?)'/g, replacer(filterObject, ""))
    .replace(/"(.+?)"/g, replacer(filterObject, ""))
    .replace(/(.+?)(\s|$)/g, replacer(filterObject, ""))

  return filterObject
}
