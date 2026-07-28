import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = (pw) => bcrypt.hash(pw, 10);

  // --- Accounts advertised on the login screen ---------------------------
  const admin = await prisma.user.upsert({
    where: { email: "admin@onvite.com" },
    update: {},
    create: {
      name: "Admin Onvite",
      username: "admin",
      email: "admin@onvite.com",
      passwordHash: await hash("Admin123!"),
      role: "ADMIN",
    },
  });

  const maria = await prisma.user.upsert({
    where: { email: "maria@mail.com" },
    update: {},
    create: {
      name: "María Fernández",
      username: "maria",
      email: "maria@mail.com",
      passwordHash: await hash("Cliente123!"),
      role: "CLIENT",
    },
  });

  // --- María's wedding event (Pro plan) + guest list ---------------------
  const event = await prisma.event.upsert({
    where: { ownerId: maria.id },
    update: {},
    create: {
      ownerId: maria.id,
      coupleName: "María & Carlos",
      title: "Boda de María & Carlos",
      dateTime: new Date("2026-09-19T19:30:00"),
      venue: "Salón Los Jardines",
      address: "Av. Banzer 3er anillo, Santa Cruz",
      dressCode: "Formal / Etiqueta",
      plan: "PRO",
      designName: "Dorado Clásico",
      templateSlug: "beach-romance",
      totalGuests: 200,
      music: "Perfect — Ed Sheeran",
      albumPhotosPerGuest: 15,
      albumDays: 60,
      accessDurationDays: 90,
      active: true,
    },
  });

  await prisma.guest.deleteMany({ where: { eventId: event.id } });
  await prisma.guest.createMany({
    data: [
      { eventId: event.id, name: "Ana Flores", companions: 1, channel: "WHATSAPP", status: "CONFIRMADO", canUpload: true },
      { eventId: event.id, name: "Luis Vargas", companions: 0, channel: "WHATSAPP", status: "CONFIRMADO", canUpload: true },
      { eventId: event.id, name: "Familia Rojas", companions: 3, channel: "CORREO", status: "CONFIRMADO", canUpload: true },
      { eventId: event.id, name: "Familia Suárez", companions: 4, channel: "WHATSAPP", status: "CONFIRMADO", canUpload: false },
      { eventId: event.id, name: "Pedro Mamani", companions: 0, channel: "WHATSAPP", status: "PENDIENTE", canUpload: false },
      { eventId: event.id, name: "Sofía Guzmán", companions: 0, channel: "WHATSAPP", status: "RECHAZADO", canUpload: false },
      { eventId: event.id, name: "Jorge Terán", companions: 0, channel: "WHATSAPP", status: "CONFIRMADO", canUpload: false },
    ],
  });

  // --- Extra registered users (for the admin "Usuarios" screen) ----------
  const extraUsers = [
    { name: "Rosa & Fernando", username: "rosaf", email: "rosaf@mail.com" },
    { name: "Diego & Laura", username: "diegolaura", email: "diegolaura@mail.com" },
    { name: "Valentina R.", username: "valen", email: "valen@mail.com" },
    { name: "Marco Ortiz", username: "marcoo", email: "marco2@mail.com" },
    { name: "Carla Nunez", username: "carlan", email: "carla@mail.com" },
    { name: "Ana Castro", username: "anac", email: "ana@mail.com" },
  ];
  const demoHash = await hash("Demo123!");
  for (const u of extraUsers) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, passwordHash: demoHash, role: "CLIENT" },
    });
  }

  // --- CRM reservations (Clientes / Ventas / Accesos) --------------------
  await prisma.reservation.deleteMany({});
  await prisma.reservation.createMany({
    data: [
      { names: "María & Carlos", email: "maria@mail.com", eventType: "Boda", city: "Santa Cruz", eventDate: new Date("2026-09-19"), plan: "Pro (Premium)", paymentMethod: "PayPal", amount: 243, contactStatus: "CERRADO", paymentStatus: "PAGADO", accessState: "POR_HABILITAR" },
      { names: "Valentina R.", email: "valen@mail.com", eventType: "XV Años", city: "Cochabamba", eventDate: new Date("2026-10-11"), plan: "Premium Plus", paymentMethod: "Airtm", amount: 383, contactStatus: "CONTACTADO", paymentStatus: "PENDIENTE", accessState: "ACTIVO" },
      { names: "Diego & Laura", email: "diegolaura@mail.com", eventType: "Compromiso", city: "La Paz", eventDate: new Date("2026-11-01"), plan: "Estándar", contactStatus: "SIN_CONTACTAR", paymentStatus: "PENDIENTE", accessState: "POR_HABILITAR" },
      { names: "Familia Choque", email: "choque@mail.com", eventType: "Bautizo", city: "El Alto", eventDate: new Date("2026-08-20"), plan: "Basico", paymentMethod: "Tigo Money", amount: 104, contactStatus: "CONTACTADO", paymentStatus: "PENDIENTE", accessState: "POR_HABILITAR" },
    ],
  });

  // --- Unified inbox (Consultas) -----------------------------------------
  const now = Date.now();
  const ago = (min) => new Date(now - min * 60000);
  await prisma.consulta.deleteMany({});
  await prisma.consulta.createMany({
    data: [
      { channel: "WHATSAPP", fromName: "Rosa Aguilar", text: "¿Tienen diseños para boda en la playa?", attended: false, receivedAt: ago(12) },
      { channel: "INSTAGRAM", fromName: "@lucia.eventos", text: "Me encantó Noche Estelar, ¿precio?", attended: false, receivedAt: ago(25) },
      { channel: "CORREO", fromName: "empresa.eventos@mail.com", text: "Cotización para 3 eventos corporativos", attended: false, receivedAt: ago(40) },
      { channel: "TELEGRAM", fromName: "@jhon_dev", text: "¿El plan Pro incluye mapa?", attended: false, receivedAt: ago(120) },
      { channel: "WHATSAPP", fromName: "Marcelo Vaca", text: "Quiero el diseño Dorado Clásico", attended: true, receivedAt: ago(180) },
      { channel: "INSTAGRAM", fromName: "@fam_torrez", text: "¿Hacen invitaciones para bautizo?", attended: true, receivedAt: ago(240) },
    ],
  });

  console.log(`Seed complete → admin=${admin.email}, maria=${maria.email}, event=${event.id}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
