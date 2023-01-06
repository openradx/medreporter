-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPERADMIN', 'ORGANIZER', 'USER');

-- CreateEnum
CREATE TYPE "ReleaseStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'DEPRECIATED');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PRIVATE', 'INSTITUTE', 'PUBLIC');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "fullName" TEXT,
    "about" TEXT,
    "currentInstituteId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Institute" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Institute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" TEXT NOT NULL,
    "role" "MembershipRole" NOT NULL,
    "instituteId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL,
    "document" JSONB NOT NULL,
    "visibility" "Visibility" NOT NULL,
    "releaseStatus" "ReleaseStatus" NOT NULL,
    "authorId" TEXT NOT NULL,
    "instituteId" TEXT,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleTranslation" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "ModuleTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL,
    "document" JSONB NOT NULL,
    "visibility" "Visibility" NOT NULL,
    "releaseStatus" "ReleaseStatus" NOT NULL,
    "authorId" TEXT NOT NULL,
    "instituteId" TEXT,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateTranslation" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "TemplateTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visibility" "Visibility" NOT NULL,
    "template" JSONB NOT NULL,
    "structureData" JSONB NOT NULL,
    "reportFormat" JSONB NOT NULL,
    "authorId" TEXT NOT NULL,
    "instituteId" TEXT,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportDetail" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "string" TEXT,
    "dateTime" TIMESTAMP(3),
    "int" BIGINT,
    "float" DOUBLE PRECISION,
    "reportId" TEXT,

    CONSTRAINT "ReportDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleCategory" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "ModuleCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateCategory" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "TemplateCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryTranslation" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Institute_name_key" ON "Institute"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_instituteId_userId_key" ON "Membership"("instituteId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Module_authorId_name_key" ON "Module"("authorId", "name");

-- CreateIndex
CREATE INDEX "ModuleTranslation_moduleId_default_idx" ON "ModuleTranslation"("moduleId", "default");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleTranslation_language_moduleId_key" ON "ModuleTranslation"("language", "moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "Template_authorId_name_key" ON "Template"("authorId", "name");

-- CreateIndex
CREATE INDEX "TemplateTranslation_templateId_default_idx" ON "TemplateTranslation"("templateId", "default");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateTranslation_language_templateId_key" ON "TemplateTranslation"("language", "templateId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportDetail_reportId_key_key" ON "ReportDetail"("reportId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleCategory_moduleId_categoryId_key" ON "ModuleCategory"("moduleId", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateCategory_templateId_categoryId_key" ON "TemplateCategory"("templateId", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_key_key" ON "Category"("key");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTranslation_categoryId_language_key" ON "CategoryTranslation"("categoryId", "language");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_currentInstituteId_fkey" FOREIGN KEY ("currentInstituteId") REFERENCES "Institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleTranslation" ADD CONSTRAINT "ModuleTranslation_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateTranslation" ADD CONSTRAINT "TemplateTranslation_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportDetail" ADD CONSTRAINT "ReportDetail_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleCategory" ADD CONSTRAINT "ModuleCategory_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleCategory" ADD CONSTRAINT "ModuleCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateCategory" ADD CONSTRAINT "TemplateCategory_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateCategory" ADD CONSTRAINT "TemplateCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
