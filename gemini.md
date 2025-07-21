- MedReporter is a web application for creating and managing medical reports.
- The frontend is built with Next.js, React, and TypeScript.
- The backend uses Next.js API routes with tRPC for typesafe APIs.
- Prisma is used as the ORM for database access, likely with a PostgreSQL database.
- Mantine is the primary React component library for the UI.
- Storybook is used for UI component development and testing.
- End-to-end testing is done with Playwright.
- Unit testing is done with Vitest.
- Internationalization is handled with Lingui.

**Common Commands:**

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run test`: Runs both unit and end-to-end tests.
- `npm run lint`: Lints the codebase.
- `npm run db:migrate`: Runs database migrations.
- `npm run db:seed`: Seeds the database with initial data.
- `npm run storybook`: Starts the Storybook server.
