import { Prisma } from "db"

export const createWhereClause = (
  filterObject: Record<string, string[]>
): Prisma.ModuleTranslationWhereInput | Prisma.TemplateTranslationWhereInput => {
  const title = (terms: string[]) =>
    terms.map((term) => ({
      title: { contains: term, mode: "insensitive" as Prisma.QueryMode },
    }))

  const description = (terms: string[]) =>
    terms.map((term) => ({
      description: { contains: term, mode: "insensitive" as Prisma.QueryMode },
    }))

  const author = (terms: string[]) =>
    terms.map((term) => ({
      module: {
        author: { username: { contains: term, mode: "insensitive" as Prisma.QueryMode } },
      },
    }))

  const languages = (terms: string[]) =>
    terms.map((term) => ({
      module: { languages: { has: term } },
    }))

  const tags = (terms: string[]) =>
    terms.map((term) => ({
      tags: { some: { label: { equals: term, mode: "insensitive" as Prisma.QueryMode } } },
    }))

  return {
    OR: [
      ...title(filterObject.title ?? []),
      ...description(filterObject.description ?? []),
      ...author(filterObject.author ?? []),
      ...tags(filterObject.tag ?? []),
      ...languages(filterObject.language ?? []),
      ...title(filterObject[""] ?? []),
      ...tags(filterObject[""] ?? []),
    ],
  }
}
