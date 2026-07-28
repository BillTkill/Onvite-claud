-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('BASICO', 'PRO', 'VIP');

-- CreateEnum
CREATE TYPE "RsvpStatus" AS ENUM ('CONFIRMADO', 'PENDIENTE', 'RECHAZADO');

-- CreateEnum
CREATE TYPE "GuestChannel" AS ENUM ('WHATSAPP', 'CORREO');

-- CreateEnum
CREATE TYPE "ConsultaChannel" AS ENUM ('WHATSAPP', 'INSTAGRAM', 'TELEGRAM', 'CORREO', 'FACEBOOK');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDIENTE', 'PAGADO');

-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('SIN_CONTACTAR', 'CONTACTADO', 'CERRADO');

-- CreateEnum
CREATE TYPE "AccessState" AS ENUM ('POR_HABILITAR', 'ACTIVO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "coupleName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "address" TEXT,
    "dressCode" TEXT,
    "plan" "Plan" NOT NULL DEFAULT 'BASICO',
    "designName" TEXT,
    "templateSlug" TEXT,
    "totalGuests" INTEGER NOT NULL DEFAULT 0,
    "music" TEXT,
    "albumPhotosPerGuest" INTEGER,
    "albumDays" INTEGER,
    "accessDurationDays" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companions" INTEGER NOT NULL DEFAULT 0,
    "channel" "GuestChannel" NOT NULL DEFAULT 'WHATSAPP',
    "status" "RsvpStatus" NOT NULL DEFAULT 'PENDIENTE',
    "canUpload" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "names" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "eventType" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3),
    "city" TEXT,
    "place" TEXT,
    "notes" TEXT,
    "plan" TEXT,
    "templateSlug" TEXT,
    "amount" INTEGER,
    "paymentMethod" TEXT,
    "contactStatus" "ContactStatus" NOT NULL DEFAULT 'SIN_CONTACTAR',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDIENTE',
    "accessState" "AccessState" NOT NULL DEFAULT 'POR_HABILITAR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consulta" (
    "id" TEXT NOT NULL,
    "channel" "ConsultaChannel" NOT NULL,
    "fromName" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attended" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Consulta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Event_ownerId_key" ON "Event"("ownerId");

-- CreateIndex
CREATE INDEX "Guest_eventId_idx" ON "Guest"("eventId");

-- CreateIndex
CREATE INDEX "Reservation_userId_idx" ON "Reservation"("userId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
