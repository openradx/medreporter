import { PrismaClient } from "@prisma/client"

type CategoryTranslations = Record<string, string>
type Categories = Record<string, CategoryTranslations>

export class CategoryManager {
  constructor(private prisma: PrismaClient) {}

  async createNewCategory(key: string, translations: CategoryTranslations) {
    return this.prisma.category.create({
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

  async updateExistingCategory(categoryId: string, translations: CategoryTranslations) {
    return Promise.all([
      ...Object.entries(translations).map(([language, label]) =>
        this.prisma.categoryTranslation.upsert({
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

  async removeUnusedCategories(categoryKeys: string[]) {
    return this.prisma.category.deleteMany({
      where: { key: { notIn: categoryKeys } },
    })
  }

  async removeUnusedCategoryTranslations(categories: Categories) {
    return Promise.all([
      ...Object.entries(categories).map(([key, translation]) => {
        const languages = Object.keys(translation)
        return this.prisma.categoryTranslation.deleteMany({
          where: { category: { key }, language: { notIn: languages } },
        })
      }),
    ])
  }

  async syncCategories(categories: Categories, removeUnused: boolean = false) {
    await Promise.all([
      ...Object.keys(categories).map((key) =>
        this.prisma.category.findUnique({ where: { key } }).then((existingCategory) => {
          const translations = categories[key]
          if (existingCategory) {
            this.updateExistingCategory(existingCategory.id, translations)
          } else {
            this.createNewCategory(key, translations)
          }
        })
      ),
    ])

    if (removeUnused) {
      await this.removeUnusedCategories(Object.keys(categories))
      await this.removeUnusedCategoryTranslations(categories)
    }
  }
}
