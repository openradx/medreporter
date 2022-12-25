import { SecurePassword } from "@blitzjs/auth"
import { faker } from "@faker-js/faker"
import {
  Institute,
  MembershipRole,
  ReleaseStatus,
  User,
  UserRole,
  Visibility,
} from "@prisma/client"
import { syncCategories } from "app/core/utils/categoryUtils"
import db, { Prisma } from "."
import defaultCategories from "./categories.json"

const EXAMPLE_USERS = 100
const EXAMPLE_INSTITUTES = 10

// Max memberships = users * institutes
const EXAMPLE_MEMBERSHIPS_MEMBER = 500
const EXAMPLE_MEMBERSHIPS_ADMIN = 100
const EXAMPLE_MEMBERSHIPS_OWNER = 10

const EXAMPLE_MODULES = 200

const isProduction = process.env.NODE_ENV === "production"

async function createSuperadmin() {
  const hashedPassword = await SecurePassword.hash("roentgen")
  await db.user.create({
    data: {
      username: "roentgen",
      email: "roentgen@medreporter.org",
      hashedPassword,
      role: "SUPERADMIN",
      about: "The admin of MedReporter",
    },
  })
}

async function createExampleUser(role: UserRole) {
  const hashedPassword = await SecurePassword.hash("roentgen")
  return db.user.create({
    data: {
      username: faker.internet.userName(),
      email: faker.internet.email().toLowerCase(),
      fullName: faker.name.fullName(),
      about: faker.lorem.paragraph(),
      hashedPassword,
      role,
    },
  })
}

async function createExampleInstitute() {
  return db.institute.create({
    data: { name: faker.company.name() },
  })
}

async function getInstituteUserCombinations() {
  const institutes = await db.institute.findMany()
  const users = await db.user.findMany()

  return faker.helpers.shuffle(
    institutes.flatMap((institute) =>
      users.map((user) => [institute.id, user.id] as [number, number])
    )
  )
}

async function createExampleMembership(
  [instituteId, userId]: [number, number],
  role: MembershipRole
) {
  return db.membership.create({
    data: {
      instituteId,
      userId,
      role,
    },
  })
}

function createModuleTranslation(
  language: string,
  defaultLanguage: boolean
): Prisma.ModuleTranslationCreateWithoutModuleInput {
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    language,
    default: defaultLanguage,
  }
}

async function createExampleModule(userId: number) {
  const languages = faker.helpers.arrayElements(["de", "en", "es", "fr", "it"])
  const translations = languages.map((language, index) =>
    createModuleTranslation(language, index === 0)
  )

  const releaseStatus = faker.helpers.arrayElement(Object.values(ReleaseStatus))
  const visibility = faker.helpers.arrayElement(Object.values(Visibility))

  return db.module.create({
    data: {
      name: faker.helpers.unique(faker.internet.domainWord),
      source: "",
      authorId: userId,
      document: {},
      translations: { create: translations },
      releaseStatus,
      visibility,
    },
  })
}

async function seed() {
  const userCount = await db.user.count()
  if (userCount) {
    // eslint-disable-next-line no-console
    console.info("Users present. Skipping user creation.")
  } else {
    // eslint-disable-next-line no-console
    console.info("Creating superadmin.")
    await createSuperadmin()

    // eslint-disable-next-line no-console
    console.info("Creating example users.")
    const promises: Promise<User>[] = []
    for (let i = 0; i < EXAMPLE_USERS; i++) {
      promises.push(createExampleUser(UserRole.USER))
    }
    await Promise.all(promises)
  }

  const categoryCount = await db.category.count()
  if (categoryCount > 0) {
    // eslint-disable-next-line no-console
    console.info("Creating default categories.")
  } else {
    // eslint-disable-next-line no-console
    console.info("Updating default categories.")
  }
  await syncCategories(defaultCategories)

  if (isProduction) {
    // eslint-disable-next-line no-console
    console.info("Finished seeding in production.")
  }

  const instituteCount = await db.institute.count()
  if (instituteCount > 0) {
    // eslint-disable-next-line no-console
    console.info("Institutes present. Skipping institute creation.")
  } else {
    // eslint-disable-next-line no-console
    console.info("Creating example institutes.")
    const promises: Promise<Institute>[] = []
    for (let i = 0; i < EXAMPLE_INSTITUTES; i++) {
      promises.push(createExampleInstitute())
    }
    await Promise.all(promises)
  }

  const membershipCount = await db.membership.count()
  if (membershipCount) {
    // eslint-disable-next-line no-console
    console.info("Memberships present. Skipping membership creation.")
  } else {
    // eslint-disable-next-line no-console
    console.info("Creating example memberships.")
    const combinations = await getInstituteUserCombinations()
    for (let i = 0; i < EXAMPLE_MEMBERSHIPS_MEMBER; i++) {
      createExampleMembership(combinations.pop()!, MembershipRole.MEMBER)
    }
    for (let i = 0; i < EXAMPLE_MEMBERSHIPS_ADMIN; i++) {
      createExampleMembership(combinations.pop()!, MembershipRole.ADMIN)
    }
    for (let i = 0; i < EXAMPLE_MEMBERSHIPS_OWNER; i++) {
      createExampleMembership(combinations.pop()!, MembershipRole.OWNER)
    }
  }

  const modulesCount = await db.module.count()
  if (modulesCount) {
    // eslint-disable-next-line no-console
    console.info("Modules present. Skipping modules creation.")
  } else {
    // eslint-disable-next-line no-console
    console.info("Creating example modules.")
    for (let i = 0; i < EXAMPLE_MODULES; i++) {
      const skip = Math.floor(Math.random() * userCount)
      // eslint-disable-next-line no-await-in-loop
      const user = (await db.user.findMany({ take: 1, skip })).at(0)!
      createExampleModule(user.id)
    }
  }
}

export default seed
