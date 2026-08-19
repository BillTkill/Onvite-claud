-- CreateEnum
CREATE TYPE "HomeMediaKind" AS ENUM ('SHOWCASE_CARD', 'SHOWCASE_ENVELOPE', 'PHONE_MOCK');

-- CreateTable
CREATE TABLE "HomeMedia" (
    "id" TEXT NOT NULL,
    "kind" "HomeMediaKind" NOT NULL,
    "position" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "label" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryFeature" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "trending" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryFeature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HomeMedia_kind_position_key" ON "HomeMedia"("kind", "position");

-- CreateIndex
CREATE UNIQUE INDEX "GalleryFeature_slug_key" ON "GalleryFeature"("slug");
