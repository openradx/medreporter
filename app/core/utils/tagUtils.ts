import db from "db"

type TagTranslations = Record<string, string>
type Tags = Record<string, TagTranslations>

async function createNewTag(key: string, translations: TagTranslations) {
  return db.tag.create({
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

async function updateExistingTag(tagId: number, translations: TagTranslations) {
  return Promise.all([
    ...Object.entries(translations).map(([language, label]) =>
      db.tagTranslation.upsert({
        where: {
          tagId_language: {
            tagId,
            language,
          },
        },
        update: {
          label: translations[language],
        },
        create: {
          tagId,
          language,
          label,
        },
      })
    ),
  ])
}

async function removeUnusedTags(tagKeys: string[]) {
  return db.tag.deleteMany({
    where: { key: { notIn: tagKeys } },
  })
}

async function removeUnusedTagTranslations(tags: Tags) {
  return Promise.all([
    ...Object.entries(tags).map(([key, translation]) => {
      const languages = Object.keys(translation)
      return db.tagTranslation.deleteMany({
        where: { tag: { key }, language: { notIn: languages } },
      })
    }),
  ])
}

export async function syncTags(tags: Tags, removeUnused: boolean = false) {
  await Promise.all([
    ...Object.keys(tags).map((key) =>
      db.tag.findUnique({ where: { key } }).then((existingTag) => {
        const translations = tags[key]
        if (existingTag) {
          updateExistingTag(existingTag.id, translations)
        } else {
          createNewTag(key, translations)
        }
      })
    ),
  ])

  if (removeUnused) {
    await removeUnusedTags(Object.keys(tags))
    await removeUnusedTagTranslations(tags)
  }
}
