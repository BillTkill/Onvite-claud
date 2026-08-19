-- CreateEnum
CREATE TYPE "TemplatePageTheme" AS ENUM ('DARK', 'LIGHT');

-- CreateTable
CREATE TABLE "TemplatePage" (
    "slug" TEXT NOT NULL,
    "theme" "TemplatePageTheme" NOT NULL DEFAULT 'DARK',
    "backgroundUrl" TEXT,
    "mainImageUrl" TEXT,
    "shot1Url" TEXT,
    "shot2Url" TEXT,
    "shot3Url" TEXT,
    "shot4Url" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TemplatePage_pkey" PRIMARY KEY ("slug")
);
