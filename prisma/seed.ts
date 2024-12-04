/* eslint-disable no-console */
import { faker } from "@faker-js/faker"
import { loadEnvConfig } from "@next/env"
import { Institute, MembershipRole, PrismaClient, User, UserRole } from "@prisma/client"
import { hashPassword } from "~/utils/cryptography"

const SUPERADMIN_USERNAME = "medreporter"
const SUPERADMIN_EMAIL = "medreporter@medreporter.org"
const SUPERADMIN_PASSWORD = "medreporter"

const EXAMPLE_USERS = 100
const EXAMPLE_INSTITUTES = 10

// Max memberships = users * institutes
const EXAMPLE_MEMBERSHIPS_MEMBER = 500
const EXAMPLE_MEMBERSHIPS_ADMIN = 100
const EXAMPLE_MEMBERSHIPS_OWNER = 10

const projectDir = process.cwd()
loadEnvConfig(projectDir)

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    superadmin = await createSuperadmin()

    console.info("Creating example users.")
    const promises: Promise<User>[] = []
    for (let i = 0; i < EXAMPLE_USERS; i++) {
      promises.push(createExampleUser(UserRole.USER))
    }
    await Promise.all(promises)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const users = await prisma.user.findMany()

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

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
