import db from "db"

type CategoryTranslations = Record<string, string>
type Categories = Record<string, CategoryTranslations>

async function createNewCategory(key: string, translations: CategoryTranslations) {
  return db.category.create({
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

async function updateExistingCategory(categoryId: number, translations: CategoryTranslations) {
  return Promise.all([
    ...Object.entries(translations).map(([language, label]) =>
      db.categoryTranslation.upsert({
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

async function removeUnusedCategories(categoryKeys: string[]) {
  return db.category.deleteMany({
    where: { key: { notIn: categoryKeys } },
  })
}

async function removeUnusedCategoryTranslations(categories: Categories) {
  return Promise.all([
    ...Object.entries(categories).map(([key, translation]) => {
      const languages = Object.keys(translation)
      return db.categoryTranslation.deleteMany({
        where: { category: { key }, language: { notIn: languages } },
      })
    }),
  ])
}

export async function syncCategories(categories: Categories, removeUnused: boolean = false) {
  await Promise.all([
    ...Object.keys(categories).map((key) =>
      db.category.findUnique({ where: { key } }).then((existingCategory) => {
        const translations = categories[key]
        if (existingCategory) {
          updateExistingCategory(existingCategory.id, translations)
        } else {
          createNewCategory(key, translations)
        }
      })
    ),
  ])

  if (removeUnused) {
    await removeUnusedCategories(Object.keys(categories))
    await removeUnusedCategoryTranslations(categories)
  }
}
