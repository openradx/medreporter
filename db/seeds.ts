import { SecurePassword } from "@blitzjs/auth"
import { faker } from "@faker-js/faker"
import { Institute, MembershipRole, ReleaseStatus, User, UserRole } from "@prisma/client"
import db from "./index"

const EXAMPLE_USERS = 100
const EXAMPLE_INSTITUTES = 10

// Max memberships = users * institutes
const EXAMPLE_MEMBERSHIPS_MEMBER = 500
const EXAMPLE_MEMBERSHIPS_ADMIN = 100
const EXAMPLE_MEMBERSHIPS_OWNER = 10

const EXAMPLE_MODULES = 300

const createSuperadmin = async () => {
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

const createExampleUser = async (role: UserRole) => {
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

const createExampleInstitute = async () =>
  db.institute.create({
    data: { name: faker.company.name() },
  })

const getInstituteUserCombinations = async () => {
  const institutes = await db.institute.findMany()
  const users = await db.user.findMany()

  return faker.helpers.shuffle(
    institutes.flatMap((institute) =>
      users.map((user) => [institute.id, user.id] as [number, number])
    )
  )
}

const createExampleMembership = async (
  [instituteId, userId]: [number, number],
  role: MembershipRole
) =>
  db.membership.create({
    data: {
      instituteId,
      userId,
      role,
    },
  })

const createExampleModule = async (userId: number) =>
  db.module.create({
    data: {
      moduleId: faker.unique(faker.internet.domainWord),
      sourceCode: "",
      releaseStatus: ReleaseStatus.DRAFT,
      authorId: userId,
      document: {},
      translations: {
        create: {
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          default: true,
          language: "en",
        },
      },
    },
  })

const seed = async () => {
  const userCount = await db.user.count()
  if (userCount) {
    // eslint-disable-next-line no-console
    console.info("Users present. Skipping user generation.")
  } else {
    // eslint-disable-next-line no-console
    console.info("Generating superadmin.")
    await createSuperadmin()

    // eslint-disable-next-line no-console
    console.info("Generating example users.")
    const promises: Promise<User>[] = []
    for (let i = 0; i < EXAMPLE_USERS; i++) {
      promises.push(createExampleUser(UserRole.USER))
    }
    await Promise.all(promises)
  }

  const instituteCount = await db.institute.count()
  if (instituteCount) {
    // eslint-disable-next-line no-console
    console.info("Insitutes present. Skipping institute generation.")
  } else {
    // eslint-disable-next-line no-console
    console.info("Generating example institutes.")
    const promises: Promise<Institute>[] = []
    for (let i = 0; i < EXAMPLE_INSTITUTES; i++) {
      promises.push(createExampleInstitute())
    }
    await Promise.all(promises)
  }

  const membershipCount = await db.membership.count()
  if (membershipCount) {
    // eslint-disable-next-line no-console
    console.info("Memberships present. Skipping membership generation.")
  } else {
    // eslint-disable-next-line no-console
    console.info("Generating example memberships.")
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
    console.info("Modules present. Skipping modules generation.")
  } else {
    // eslint-disable-next-line no-console
    console.info("Generating example modules.")
    for (let i = 0; i < EXAMPLE_MODULES; i++) {
      const skip = Math.floor(Math.random() * userCount)
      // eslint-disable-next-line no-await-in-loop
      const user = (await db.user.findMany({ take: 1, skip })).at(0)!
      createExampleModule(user.id)
    }
  }
}

export default seed
