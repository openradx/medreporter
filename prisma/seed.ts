/* eslint-disable no-console */
import { faker } from "@faker-js/faker"
import { loadEnvConfig } from "@next/env"
import {
  Institute,
  MembershipRole,
  PrismaClient,
  ReleaseStatus,
  User,
  UserRole,
  Visibility,
} from "@prisma/client"
import fs from "fs"
import yaml from "js-yaml"
import path from "path"
import { hashPassword, randomString } from "~/utils/cryptography"

const EXAMPLE_USERS = 100
const EXAMPLE_INSTITUTES = 10

// Max memberships = users * institutes
const EXAMPLE_MEMBERSHIPS_MEMBER = 500
const EXAMPLE_MEMBERSHIPS_ADMIN = 100
const EXAMPLE_MEMBERSHIPS_OWNER = 10

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const prisma = new PrismaClient()

interface DefaultTemplate {
  slug: string
  language: string
  title: string
  description: string
  categories: string[]
}

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

async function createSuperuser() {
  const username = process.env.SUPERUSER_USERNAME
  if (!username) {
    console.info("SUPERUSER_USERNAME is not set. Skipping superuser creation.")
    return null
  }
  const email = process.env.SUPERUSER_EMAIL
  if (!email) {
    console.info("SUPERUSER_EMAIL is not set. Skipping superuser creation.")
    return null
  }
  const password = process.env.SUPERUSER_PASSWORD
  if (!password) {
    console.info("SUPERUSER_PASSWORD is not set. Skipping superuser creation.")
    return null
  }

  return createUser({
    username,
    email,
    password,
    role: UserRole.SUPERUSER,
    fullName: "Admin",
    about: "The main admin of MedReporter",
  })
}

async function createDefaultUser() {
  return createUser({
    username: "default",
    email: "",
    password: randomString(32),
    fullName: "Default User",
    about: "The default user of MedReporter",
    role: UserRole.USER,
  })
}

async function createExampleUser(role: UserRole) {
  return createUser({
    username: faker.internet.username(),
    email: faker.internet.email().toLowerCase(),
    password: "medreporter",
    fullName: faker.person.fullName(),
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

async function seedUsers() {
  const userCount = await prisma.user.count()
  if (userCount) {
    console.info("Users present. Skipping user creation.")
  } else {
    console.info("Creating superuser.")
    await createSuperuser()

    console.info("Creating default user.")
    await createDefaultUser()

    console.info("Creating example users.")
    const promises: Promise<User>[] = []
    for (let i = 0; i < EXAMPLE_USERS; i++) {
      promises.push(createExampleUser(UserRole.USER))
    }
    await Promise.all(promises)
  }
}

async function seedInstitutes() {
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
}

async function seedMemberships() {
  const membershipCount = await prisma.membership.count()
  if (membershipCount) {
    console.info("Memberships present. Skipping membership creation.")
  } else {
    console.info("Creating example memberships.")
    const combinations = await getInstituteUserCombinations()
    for (let i = 0; i < EXAMPLE_MEMBERSHIPS_MEMBER; i++) {
      await createExampleMembership(combinations.pop()!, MembershipRole.MEMBER)
    }
    for (let i = 0; i < EXAMPLE_MEMBERSHIPS_ADMIN; i++) {
      await createExampleMembership(combinations.pop()!, MembershipRole.ADMIN)
    }
    for (let i = 0; i < EXAMPLE_MEMBERSHIPS_OWNER; i++) {
      await createExampleMembership(combinations.pop()!, MembershipRole.OWNER)
    }
  }
}

async function seedDefaultTemplates() {
  const defaultUser = await prisma.user.findFirst({ where: { username: "default" } })
  if (!defaultUser) {
    throw new Error("Default user not found.")
  }

  console.info("Creating or updating default templates.")
  const templatesFile = path.join(projectDir, "prisma", "default-templates.yml")
  const templates = yaml.load(fs.readFileSync(templatesFile).toString()) as DefaultTemplate[]
  for (const template of templates) {
    const additionalData = {
      authorId: defaultUser.id,
      document: {},
      visibility: Visibility.PUBLIC,
      releaseStatus: ReleaseStatus.PUBLISHED,
      categories: {
        connectOrCreate: template.categories.map((category) => ({
          where: { key: category },
          create: { key: category },
        })),
      },
    }

    await prisma.template.upsert({
      create: {
        ...template,
        ...additionalData,
      },
      update: {
        ...template,
        ...additionalData,
      },
      where: {
        authorId_slug: {
          authorId: defaultUser.id,
          slug: template.slug,
        },
      },
    })
  }
}

async function seed() {
  await seedUsers()
  await seedInstitutes()
  await seedMemberships()
  await seedDefaultTemplates()
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
