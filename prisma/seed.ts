/* eslint-disable no-console */
import { faker } from "@faker-js/faker"
import { loadEnvConfig } from "@next/env"
import {
  Institute,
  MembershipRole,
  Prisma,
  PrismaClient,
  ReleaseStatus,
  User,
  UserRole,
  Visibility,
} from "@prisma/client"
import fs from "fs"
import glob from "glob"
import path from "path"
import { syncCategories } from "~/utils/categoryUtils"
import { hashPassword } from "~/utils/cryptography"
import { syncDefaultFigure } from "~/utils/figureUtils"
import defaultCategories from "./seeds/categories.json"

const SUPERADMIN_USERNAME = "roentgen"
const SUPERADMIN_EMAIL = "roentgen@medreporter.org"
const SUPERADMIN_PASSWORD = "roentgen"

const EXAMPLE_USERS = 100
const EXAMPLE_INSTITUTES = 10

// Max memberships = users * institutes
const EXAMPLE_MEMBERSHIPS_MEMBER = 500
const EXAMPLE_MEMBERSHIPS_ADMIN = 100
const EXAMPLE_MEMBERSHIPS_OWNER = 10

const EXAMPLE_MODULES = 200

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const isProduction = process.env.NODE_ENV === "production"

const prisma = new PrismaClient()

interface UserData extends Pick<User, "username" | "email" | "role" | "fullName" | "about"> {
  password: string
}

async function createUser(data: UserData) {
  const { password, ...rest } = data
  const hashedPassword = await hashPassword(password)
  const user = await prisma.user.create({
    data: {
      ...rest,
      hashedPassword,
    },
  })
  await prisma.account.create({
    data: {
      userId: user.id,
      type: "credentials",
      provider: "credentials",
      providerAccountId: user.id,
    },
  })
  return user
}

async function createSuperadmin() {
  return createUser({
    username: SUPERADMIN_USERNAME,
    email: SUPERADMIN_EMAIL,
    password: SUPERADMIN_PASSWORD,
    role: UserRole.SUPERADMIN,
    fullName: "Admin",
    about: "The main admin of MedReporter",
  })
}

async function fetchSuperadmin() {
  return prisma.user.findUniqueOrThrow({ where: { username: SUPERADMIN_USERNAME } })
}

async function createExampleUser(role: UserRole) {
  return createUser({
    username: faker.internet.userName(),
    email: faker.internet.email().toLowerCase(),
    password: "roentgen",
    fullName: faker.name.fullName(),
    about: faker.lorem.paragraph(),
    role,
  })
}

async function createExampleInstitute() {
  return prisma.institute.create({
    data: { name: faker.company.name() },
  })
}

async function getInstituteUserCombinations() {
  const institutes = await prisma.institute.findMany()
  const users = await prisma.user.findMany()

  return faker.helpers.shuffle(
    institutes.flatMap((institute) =>
      users.map((user) => [institute.id, user.id] as [string, string])
    )
  )
}

async function createExampleMembership(
  [instituteId, userId]: [string, string],
  role: MembershipRole
) {
  return prisma.membership.create({
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

async function createExampleModule(userId: string) {
  const languages = faker.helpers.arrayElements(["de", "en", "es", "fr", "it"])
  const translations = languages.map((language, index) =>
    createModuleTranslation(language, index === 0)
  )

  const releaseStatus = faker.helpers.arrayElement(Object.values(ReleaseStatus))
  const visibility = faker.helpers.arrayElement(Object.values(Visibility))

  return prisma.module.create({
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
  /*
   * Users
   */
  let superadmin: User
  const userCount = await prisma.user.count()
  if (userCount) {
    console.info("Users present. Skipping user creation.")
    superadmin = await fetchSuperadmin()
  } else {
    console.info("Creating superadmin.")
    superadmin = await createSuperadmin()

    console.info("Creating example users.")
    const promises: Promise<User>[] = []
    for (let i = 0; i < EXAMPLE_USERS; i++) {
      promises.push(createExampleUser(UserRole.USER))
    }
    await Promise.all(promises)
  }

  /*
   * Categories
   */
  const categoryCount = await prisma.category.count()
  if (categoryCount === 0) {
    console.info("Creating default categories.")
  } else {
    console.info("Updating default categories.")
  }
  await syncCategories(prisma, defaultCategories)

  if (isProduction) {
    console.info("Finished seeding in production.")
  }

  /*
   * Institutes
   */
  const instituteCount = await prisma.institute.count()
  if (instituteCount > 0) {
    console.info("Institutes present. Skipping institute creation.")
  } else {
    console.info("Creating example institutes.")
    const promises: Promise<Institute>[] = []
    for (let i = 0; i < EXAMPLE_INSTITUTES; i++) {
      promises.push(createExampleInstitute())
    }
    await Promise.all(promises)
  }

  /*
   * Memberships
   */
  const membershipCount = await prisma.membership.count()
  if (membershipCount) {
    console.info("Memberships present. Skipping membership creation.")
  } else {
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

  /*
   * Figures
   */
  const figuresCount = await prisma.figure.count()
  if (figuresCount === 0) {
    console.log("Creating default figures.")
  } else {
    console.log("Updating default figures.")
  }

  glob
    .sync("**/*.svg", {
      cwd: path.join(projectDir, "prisma", "seeds", "figures"),
      absolute: true,
    })
    .forEach((filename) => {
      const { name } = path.parse(filename)
      const source = fs.readFileSync(filename).toString()
      syncDefaultFigure(prisma, superadmin.id, name, source)
    })

  /*
   * Modules
   */
  const modulesCount = await prisma.module.count()
  if (modulesCount) {
    console.info("Modules present. Skipping modules creation.")
  } else {
    console.info("Creating example modules.")
    for (let i = 0; i < EXAMPLE_MODULES; i++) {
      const skip = Math.floor(Math.random() * userCount)
      // eslint-disable-next-line no-await-in-loop
      const user = (await prisma.user.findMany({ take: 1, skip })).at(0)!
      createExampleModule(user.id)
    }
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
