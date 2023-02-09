import { PrismaClient } from "@prisma/client"

type CategoryTranslations = Record<string, string>
type Categories = Record<string, CategoryTranslations>

async function createNewCategory(
  prisma: PrismaClient,
  key: string,
  translations: CategoryTranslations
) {
  return prisma.category.create({
    data: {
      key,
      translations: {
        create: Object.entries(translations).map(([language, label]) => ({
          language,
          label,
        })),
      },
    },
  })
}

async function updateExistingCategory(
  prisma: PrismaClient,
  categoryId: string,
  translations: CategoryTranslations
) {
  return Promise.all([
    ...Object.entries(translations).map(([language, label]) =>
      prisma.categoryTranslation.upsert({
        where: {
          categoryId_language: {
            categoryId,
            language,
          },
        },
        update: {
          label: translations[language],
        },
        create: {
          categoryId,
          language,
          label,
        },
      })
    ),
  ])
}

async function removeUnusedCategories(prisma: PrismaClient, categoryKeys: string[]) {
  return prisma.category.deleteMany({
    where: { key: { notIn: categoryKeys } },
  })
}

async function removeUnusedCategoryTranslations(prisma: PrismaClient, categories: Categories) {
  return Promise.all([
    ...Object.entries(categories).map(([key, translation]) => {
      const languages = Object.keys(translation)
      return prisma.categoryTranslation.deleteMany({
        where: { category: { key }, language: { notIn: languages } },
      })
    }),
  ])
}

export async function syncCategories(
  prisma: PrismaClient,
  categories: Categories,
  removeUnused: boolean = false
) {
  await Promise.all([
    ...Object.keys(categories).map((key) =>
      prisma.category.findUnique({ where: { key } }).then((existingCategory) => {
        const translations = categories[key]
        if (existingCategory) {
          updateExistingCategory(prisma, existingCategory.id, translations)
        } else {
          createNewCategory(prisma, key, translations)
        }
      })
    ),
  ])

  if (removeUnused) {
    await removeUnusedCategories(prisma, Object.keys(categories))
    await removeUnusedCategoryTranslations(prisma, categories)
  }
}
