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
      slug: "maria-carlos",
      paymentQr: "https://onvite.com/pay/maria-carlos",
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

  // --- María's gift registry --------------------------------------------
  await prisma.gift.deleteMany({ where: { eventId: event.id } });
  await prisma.gift.createMany({
    data: [
      { eventId: event.id, name: "Juego de vajilla", reservedBy: "Ana Flores" },
      { eventId: event.id, name: "Cafetera espresso", reservedBy: null },
      { eventId: event.id, name: "Set de copas de cristal", reservedBy: "Familia Rojas" },
      { eventId: event.id, name: "Mantelería de lino", reservedBy: null },
      { eventId: event.id, name: "Robot de cocina", reservedBy: null },
    ],
  });

  // --- Client accounts (all appear in Usuarios AND have a matching booking) ---
  // Every client user below also has a reservation (same email) so the data is
  // coherent across Usuarios / Clientes / Accesos / Paneles.
  const extraUsers = [
    { name: "Rosa & Fernando", username: "rosaf", email: "rosaf@mail.com" },
    { name: "Diego & Laura", username: "diegolaura", email: "diegolaura@mail.com" },
    { name: "Valentina R.", username: "valen", email: "valen@mail.com" },
    { name: "Marco Ortiz", username: "marcoo", email: "marco2@mail.com" },
    { name: "Carla Nunez", username: "carlan", email: "carla@mail.com" },
    { name: "Ana Castro", username: "anac", email: "ana@mail.com" },
    { name: "Familia Choque", username: "choque", email: "choque@mail.com" },
  ];
  const demoHash = await hash("Demo123!");
  for (const u of extraUsers) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, passwordHash: demoHash, role: "CLIENT" },
    });
  }

  // --- Three clean TEST accounts (one per plan) for end-to-end testing -----
  const testHash = await hash("Test123!");
  const testUsers = [
    { name: "Prueba Estándar", username: "test_basico", email: "basico@test.com" },
    { name: "Prueba Premium", username: "test_premium", email: "premium@test.com" },
    { name: "Prueba VIP", username: "test_vip", email: "vip@test.com" },
  ];
  for (const u of testUsers) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, passwordHash: testHash, role: "CLIENT" },
    });
  }

  // --- CRM reservations (Clientes / Ventas / Accesos) --------------------
  // Only three canonical plans: "Estándar", "Premium", "Premium VIP".
  // One reservation per client account so everyone is coherent across screens.
  await prisma.reservation.deleteMany({});
  await prisma.reservation.createMany({
    data: [
      { names: "María & Carlos", email: "maria@mail.com", eventType: "Boda", city: "Santa Cruz", eventDate: new Date("2026-09-19"), plan: "Premium", paymentMethod: "PayPal", amount: 165, contactStatus: "CERRADO", paymentStatus: "PAGADO", accessState: "ACTIVO", templateSlug: "beach-romance", notes: "Queremos tonos tierra y dorados. La música: nuestra canción es «Perfect». Boda de día en jardín." },
      { names: "Rosa & Fernando", email: "rosaf@mail.com", eventType: "Boda", city: "Tarija", eventDate: new Date("2026-10-04"), plan: "Premium VIP", paymentMethod: "QR Simple (BCB)", amount: 200, contactStatus: "CONTACTADO", paymentStatus: "PENDIENTE", accessState: "POR_HABILITAR", templateSlug: "elegant-royal" },
      { names: "Valentina R.", email: "valen@mail.com", eventType: "XV Años", city: "Cochabamba", eventDate: new Date("2026-10-11"), plan: "Premium VIP", paymentMethod: "Airtm", amount: 200, contactStatus: "CONTACTADO", paymentStatus: "PENDIENTE", accessState: "POR_HABILITAR", templateSlug: "dark-blue-garden", notes: "Tema: noche estelar, azul y plata. 250 invitados. Quiero álbum QR y música en vivo." },
      { names: "Diego & Laura", email: "diegolaura@mail.com", eventType: "Compromiso", city: "La Paz", eventDate: new Date("2026-11-01"), plan: "Estándar", contactStatus: "SIN_CONTACTAR", paymentStatus: "PENDIENTE", accessState: "POR_HABILITAR", templateSlug: "quiet-luxury" },
      { names: "Marco Ortiz", email: "marco2@mail.com", eventType: "Graduación", city: "Sucre", eventDate: new Date("2026-12-05"), plan: "Estándar", paymentMethod: "Transferencia bancaria", amount: 100, contactStatus: "CONTACTADO", paymentStatus: "PAGADO", accessState: "POR_HABILITAR", templateSlug: "ciel-divin" },
      { names: "Carla Nunez", email: "carla@mail.com", eventType: "Boda", city: "Santa Cruz", eventDate: new Date("2026-09-27"), plan: "Premium", paymentMethod: "PayPal", amount: 165, contactStatus: "CERRADO", paymentStatus: "PAGADO", accessState: "POR_HABILITAR", templateSlug: "classy-floral" },
      { names: "Ana Castro", email: "ana@mail.com", eventType: "Boda", city: "Beni", eventDate: new Date("2026-11-15"), plan: "Premium VIP", contactStatus: "SIN_CONTACTAR", paymentStatus: "PENDIENTE", accessState: "POR_HABILITAR", templateSlug: "tuscan-wine" },
      { names: "Familia Choque", email: "choque@mail.com", eventType: "Bautizo", city: "El Alto", eventDate: new Date("2026-08-20"), plan: "Estándar", paymentMethod: "Tigo Money", amount: 100, contactStatus: "CONTACTADO", paymentStatus: "PENDIENTE", accessState: "POR_HABILITAR", templateSlug: "french-village" },
      { names: "Prueba Estándar", email: "basico@test.com", eventType: "Boda", city: "Santa Cruz", eventDate: new Date("2026-10-18"), plan: "Estándar", contactStatus: "SIN_CONTACTAR", paymentStatus: "PENDIENTE", accessState: "POR_HABILITAR", templateSlug: "gondola-dream" },
      { names: "Prueba Premium", email: "premium@test.com", eventType: "Boda", city: "Cochabamba", eventDate: new Date("2026-11-08"), plan: "Premium", contactStatus: "SIN_CONTACTAR", paymentStatus: "PENDIENTE", accessState: "POR_HABILITAR", templateSlug: "eternal-navy", notes: "Cuenta de prueba Premium. Nos gusta el azul marino y dorado." },
      { names: "Prueba VIP", email: "vip@test.com", eventType: "Boda", city: "La Paz", eventDate: new Date("2026-12-13"), plan: "Premium VIP", contactStatus: "SIN_CONTACTAR", paymentStatus: "PENDIENTE", accessState: "POR_HABILITAR", templateSlug: "elegant-royal" },
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
